---
title: PromCon EU 2026 Highlights
linkTitle: PromCon EU 2026 Highlights
newsSubtitle: 'November 17, 2026'
publishdate: 2026-11-17T00:00:00.000Z
aliases:
  - /blog/2026/11/promcon-eu-2026
authors:
  - avatar: 'https://avatars.githubusercontent.com/vicwicker'
    login: vicwicker
    name: Victor Herrero Otal
tags:
  - observability
  - apeiro
  - community-event
  - prometheus
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/          │
   │  documentation                                 │
   │                                                │
   │  Go ahead and edit this file directly.         │
   │  Changes here are the source of truth.         │
   └────────────────────────────────────────────────┘
-->


# PromCon EU 2026 Highlights

PromCon EU 2026 took place on October 7th and 8th in Munich. As in previous years, the single-track conference brought together Prometheus developers and users to discuss the latest developments in the ecosystem. This year was particularly special for us because, for the first time, we had our own talk at the conference, where Victor Herrero Otal presented our work on global querying for Prometheus in Gardener.

## Global Querying in Gardener

If you have worked with Gardener's monitoring stack, you are probably familiar with our Prometheus setup. We run Prometheus instances on every level of Gardener's hierarchical architecture. Starting at the top, there is the garden and longterm Prometheus in the runtime cluster, followed by a cache, aggregate and seed Prometheus per seed, and finally one shoot Prometheus per shoot. Currently, Gardener uses [hierarchical federation](https://prometheus.io/docs/prometheus/latest/federation/#hierarchical-federation) to provide a global view across multiple Prometheus instances. Such a setup, however, forces us to decide upfront which metrics and aggregations to carry up the tree. Once we have made that decision, we are stuck with it.

We have started to build the Gardener [PromQL Querier](https://github.com/gardener/promql-querier), a stateless proxy that makes the entire fleet appear as a single Prometheus instance at query time. Aggregations and a few other expressions are pushed down to each downstream and partial results are merged locally, all through the standard Prometheus HTTP API and the stock Prometheus engine. This is what makes the Gardener PromQL Querier efficient: each Prometheus instance handles its own share of the work, so the load is spread across the hierarchy and only pre-computed partial results are passed up the tree. And unlike federation, you don’t have to choose in advance which series to collect, because the proxy simply evaluates whatever query it receives.

We kicked off this endeavour in the summer of 2026 and the project is still in its infancy, but we are looking forward to continuing the work in 2027. You can watch the talk here: [A Prometheus-Native Approach to Global Querying](https://www.youtube.com/watch?v=3iCubwc19Gk)

![Victor presenting the Gardener PromQL Querier talk at PromCon EU 2026](images/gardener-promql-querier.jpg)

## Migration to Native Histograms

Native histograms remained one of the main topics at this year's edition. One of the recurring pain points of native histograms is the migration from classic histograms. Prometheus supports converting classic histograms into NHCB at scrape time, but queries in existing dashboards and alerts also need to be migrated. Bartłomiej Płotka and Raphaël Bizos proposed a query-time conversion where the engine translates NHCB back into classic histogram format, so that the storage can migrate to NHCB form while dashboards and alerts keep working unchanged.

## Delta Temporality

Owen Williams presented his work on native delta counters, a new counter type in Prometheus. A cumulative counter reports the running total so far, while a delta counter reports how much changed since the previous sample. Deltas fit a push model, where the producer knows when the last sample was sent and can emit an exact delta, and that is how Prometheus implements them: they are ingested over OTLP rather than scraped.

## Fighting Cardinality

On the ingestion side, Walther Lee showed how materialized metrics aggregate series as data is ingested to produce metrics with lower cardinality. The work currently lives in a Prometheus fork and has since been [proposed upstream](https://github.com/prometheus/proposals/pull/108). For now the raw series are still stored alongside the aggregates, so the gain is faster queries rather than less storage. Dropping the raw data and keeping only the aggregates is an idea for later. That would be promising for Gardener, where Prometheus instances in very large seeds or shoots can struggle to honor their intended 30-day retention because high-cardinality metrics fill the disk long before that.

Roman Khavronenko and Langson Zhang approached cardinality by measuring it rather than reducing it. Their estimator approximates each metric's cardinality in real time, as the data is ingested rather than by querying the TSDB. Estimation results are exposed as Prometheus metrics themselves that can be scraped to create alerts on cardinality spikes.

## Sharing Exporters with OpenTelemetry

Interoperability between OpenTelemetry and Prometheus continued to be a topic. The two ecosystems have been duplicating each other's work for years. Where there is a Prometheus exporter, there is likely an OpenTelemetry receiver for the same metrics, and vice versa. Arthur Sens and Kyle Eckhart proposed a way to build Prometheus exporters so that the same code can run either as a standalone exporter or embedded in an OpenTelemetry Collector, letting the two communities share code instead of maintaining overlapping exporters and receivers. The approach is early enough that only a handful of exporters have been adapted so far.

## Perses

In a lightning talk, Nicolas Takashi gave a heads-up that kube-prometheus, which ships Grafana dashboards by default, now has an opt-in Perses alternative. Perses is a CNCF sandbox project for visualization, and in Gardener we are currently working on adopting it to display observability data, replacing Plutono.

## Alertmanager Is Alive Again

Guido Trotter, Ethan Hunter, Solomon Jacobs, and Siavash Safi introduced themselves as the new maintainer team for Alertmanager. The project had slowed down in recent years, and the need to revamp it was an outcome of PromCon EU 2025. The new team has fixed the most pressing issues and announced plans to take the project further.

## Until Next Year

PromCon continues to be one of the most valuable conferences for anyone working with Prometheus at scale. Presenting our own work this year was a great experience, and we are looking forward to continuing to develop the Gardener PromQL Querier. See you in 2027.

## Watch the Recording

You can watch the conference recording on YouTube: [PromCon EU 2026](https://www.youtube.com/watch?v=JeAZRf_1dYc&list=PLW6MnQlLn89E)
