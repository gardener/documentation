import { defineConfig } from 'vitepress'
import { defineAdditionalConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  srcDir: "docs",
  lastUpdated: true,
  ignoreDeadLinks: true, //ToDo fix dead links 
  title: "Gardener",
      head: [
      [
        'link',
        { rel: 'icon', type: 'image/svg+xml', href: '/gardener-logo-large.svg' }
      ],
      [
        'link',
        { rel: 'icon', type: 'image/png', href: '/gardener-logo-mini.png' }
      ],
      ['meta', { name: 'theme-color', content: '#5f67ee' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: 'Gardener' }],
      [
        'meta',
        {
          property: 'og:image',
          content: 'https://gardener.cloud/images/lp/gardener-logo.svg'
        } 
      ],
      ['meta', { property: 'og:url', content: 'https://gardener.cloud/' }],
      //todo add analytics
      //[
      //  'script',
      //  {
      //    src: 'https://cdn.usefathom.com/script.js',
      //    'data-site': 'AZBRSFGG',
      //    'data-spa': 'auto',
      //    defer: ''
      //  }
      //]
    ],

    themeConfig: {
      logo: { src: '/gardener-logo-large.svg', width: 24, height: 24 },
      nav: nav(),
      editLink: {
        pattern: 'https://github.com/gardener/documentation/tree/master/website/:path',
        text: 'Edit this page on GitHub'
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/gardener' },
        { icon: 'slack', link: 'https://join.slack.com/t/gardener-cloud/shared_invite/zt-33c9daems-3oOorhnqOSnldZPWqGmIBw' }
      ],
      sidebar: {
        '/documentation/': [
          {
            text: 'Getting Started',
            collapsed: true,
            items: [
              {
                text: 'Introduction to Gardener',
                link: '/documentation/getting-started/introduction/'
              },
              {
                text: 'Architecture',
                link: '/documentation/getting-started/architecture/'
              },
              {
                text: 'Gardener Projects',
                link: '/documentation/getting-started/project/'
              },
              {
                text: 'Gardener Shoots',
                link: '/documentation/getting-started/shoots/'
              },
              {
                text: 'Control Plane Components',
                link: '/documentation/getting-started/ca-components/'
              },
              {
                text: 'Shoot Lifecycle',
                link: '/documentation/getting-started/lifecycle/'
              },
              {
                text: 'Observability',
                items: [
                  {
                    text: 'Components',
                    link: '/documentation/getting-started/observability/components/'
                  },
                  {
                    text: 'Alerts',
                    link: '/documentation/getting-started/observability/alerts/'
                  },
                  {
                    text: 'Shoot Status',
                    link: '/documentation/getting-started/observability/shoot-status/'
                  }
                ]
              },
              {
                text: 'Features',
                items: [
                  {
                    text: 'Hibernation',
                    link: '/documentation/getting-started/features/hibernation/'
                  },
                  {
                    text: 'Workerless Shoots',
                    link: '/documentation/getting-started/features/workerless-shoots/'
                  },
                  {
                    text: 'Credential Rotation',
                    link: '/documentation/getting-started/features/credential-rotation/'
                  },
                  {
                    text: 'External DNS Management',
                    link: '/documentation/getting-started/features/dns-management/'
                  },
                  {
                    text: 'Certificate Management',
                    link: '/documentation/getting-started/features/certificate-management/'
                  },
                  {
                    text: 'Vertical Pod Autoscaler',
                    link: '/documentation/getting-started/features/vpa/'
                  },
                  {
                    text: 'Cluster Autoscaler',
                    link: '/documentation/getting-started/features/cluster-autoscaler/'
                  }
                ]
              },
              {
                text: 'Common Pitfalls',
                link: '/documentation/getting-started/common-pitfalls/'
              }
            ]
          },
          {
            text: 'Guides',
            collapsed: true,
            items: [
              {
                text: 'Set Up Client Tools',
                items: [
                  {
                    text: 'Fun with kubectl Aliases',
                    link: '/documentation/guides/client-tools/bash-tips/'
                  },
                  {
                    text: 'Kubeconfig Context as bash Prompt',
                    link: '/documentation/guides/client-tools/bash-kubeconfig/'
                  },
                  {
                    text: 'Organizing Access Using kubeconfig Files',
                    link: '/documentation/guides/client-tools/working-with-kubeconfig/'
                  }
                ]
              },
              {
                text: 'High Availability',
                items: [
                  {
                    text: 'Best Practices',
                    link: '/documentation/guides/high-availability/best-practices/'
                  },
                  {
                    text: 'Chaos Engineering',
                    link: '/documentation/guides/high-availability/chaos-engineering/'
                  },
                  {
                    text: 'Control Plane',
                    link: '/documentation/guides/high-availability/control-plane/'
                  }
                ]
              },
              {
                text: 'Networking',
                items: [
                  {
                    text: 'Enable IPv4/IPv6 (dual-stack) Ingress on AWS',
                    link: '/documentation/guides/networking/dual-stack-ipv4-ipv6-ingress-aws/'
                  },
                  {
                    text: 'Support for IPv6 on AWS',
                    link: '/documentation/guides/networking/ipv6/'
                  },
                  {
                    text: 'Manage Certificates with Gardener',
                    link: '/documentation/guides/networking/certificate-extension/'
                  },
                  {
                    text: 'Manage Certificates with Gardener for Default Domain',
                    link: '/documentation/guides/networking/certificate-extension-default-domain/'
                  },
                  {
                    text: 'Managing DNS with Gardener',
                    link: '/documentation/guides/networking/dns-extension/'
                  }
                ]
              },
              {
                text: 'Administer Client (Shoot) Clusters',
                items: [
                  {
                    text: 'Scalability of Gardener Managed Kubernetes Clusters',
                    link: '/documentation/guides/administer-shoots/scalability/'
                  },
                  {
                    text: 'Authenticating with an Identity Provider',
                    link: '/documentation/guides/administer-shoots/oidc-login/'
                  },
                  {
                    text: 'Backup and Restore of Kubernetes Objects',
                    link: '/documentation/guides/administer-shoots/backup-restore/'
                  },
                  {
                    text: 'Create / Delete a Shoot Cluster',
                    link: '/documentation/guides/administer-shoots/create-delete-shoot/'
                  },
                  {
                    text: 'Create a Shoot Cluster Into an Existing AWS VPC',
                    link: '/documentation/guides/administer-shoots/create-shoot-into-existing-aws-vpc/'
                  },
                  {
                    text: 'Fix Problematic Conversion Webhooks',
                    link: '/documentation/guides/administer-shoots/conversion-webhook/'
                  },
                  {
                    text: 'GPU Enabled Cluster',
                    link: '/documentation/guides/administer-shoots/gpu/'
                  },
                  {
                    text: 'Shoot Cluster Maintenance',
                    link: '/documentation/guides/administer-shoots/maintain-shoot/'
                  },
                  {
                    text: 'Tailscale',
                    link: '/documentation/guides/administer-shoots/tailscale/'
                  }
                ]
              },
              {
                text: 'Monitor and Troubleshoot',
                items: [
                  {
                    text: 'Analyzing Node Removal and Failures',
                    link: '/documentation/guides/monitoring-and-troubleshooting/analyzing-node-failures/'
                  },
                  {
                    text: 'Get a Shell to a Gardener Shoot Worker Node',
                    link: '/documentation/guides/monitoring-and-troubleshooting/shell-to-node/'
                  },
                  {
                    text: 'How to Debug a Pod',
                    link: '/documentation/guides/monitoring-and-troubleshooting/debug-a-pod/'
                  },
                  {
                    text: 'tail -f /var/log/my-application.log',
                    link: '/documentation/guides/monitoring-and-troubleshooting/tail-logfile/'
                  }
                ]
              },
              {
                text: 'Applications',
                items: [
                  {
                    text: 'Shoot Pod Autoscaling Best Practices',
                    link: '/documentation/guides/applications/shoot-pod-autoscaling-best-practices/'
                  },
                  {
                    text: 'Specifying a Disruption Budget for Kubernetes Controllers',
                    link: '/documentation/guides/applications/pod-disruption-budget/'
                  },
                  {
                    text: 'Access a Port of a Pod Locally',
                    link: '/documentation/guides/applications/access-pod-from-local/'
                  },
                  {
                    text: 'Auditing Kubernetes for Secure Setup',
                    link: '/documentation/guides/applications/insecure-configuration/'
                  },
                  {
                    text: 'Container Image Not Pulled',
                    link: '/documentation/guides/applications/missing-registry-permission/'
                  },
                  {
                    text: 'Container Image Not Updating',
                    link: '/documentation/guides/applications/image-pull-policy/'
                  },
                  {
                    text: 'Custom Seccomp Profile',
                    link: '/documentation/guides/applications/secure-seccomp/'
                  },
                  {
                    text: 'Dockerfile Pitfalls',
                    link: '/documentation/guides/applications/dockerfile-pitfall/'
                  },
                  {
                    text: 'Dynamic Volume Provisioning',
                    link: '/documentation/guides/applications/dynamic-pvc/'
                  },
                  {
                    text: 'Install Knative in Gardener Clusters',
                    link: '/documentation/guides/applications/knative-install/'
                  },
                  {
                    text: 'Integrity and Immutability',
                    link: '/documentation/guides/applications/content_trust/'
                  },
                  {
                    text: 'Kubernetes Antipatterns',
                    link: '/documentation/guides/applications/antipattern/'
                  },
                  {
                    text: 'Namespace Isolation',
                    link: '/documentation/guides/applications/network-isolation/'
                  },
                  {
                    text: 'Orchestration of Container Startup',
                    link: '/documentation/guides/applications/container-startup/'
                  },
                  {
                    text: 'Out-Dated HTML and JS Files Delivered',
                    link: '/documentation/guides/applications/service-cache-control/'
                  },
                  {
                    text: 'Remove Committed Secrets in Github 💀',
                    link: '/documentation/guides/applications/commit-secret-fail/'
                  },
                  {
                    text: 'Using Prometheus and Grafana to Monitor K8s',
                    link: '/documentation/guides/applications/prometheus/'
                  }
                ]
              }
            ]
          },
          {
            text: 'Security and Compliance',
            collapsed: true,
            items: [
              {
                text: 'Kubernetes Cluster Hardening Procedure',
                link: '/documentation/security-and-compliance/kubernetes-hardening/'
              },
              {
                text: 'Run DISA K8s STIGs Ruleset',
                link: '/documentation/security-and-compliance/disa-k8s-stig-shoot/'
              },
              {
                text: 'Gardener Compliance Report',
                link: '/documentation/security-and-compliance/report/'
              },
              {
                text: 'Credential Rotation',
                link: '/documentation/security-and-compliance/credential-rotation/'
              },
              {
                text: 'Regional Restrictions',
                link: '/documentation/security-and-compliance/regional-restrictions/'
              }
            ]
          },
          { text: 'Gardener', link: '/documentation/gardener/' },
          { text: 'List of Extensions', link: '/documentation/extensions/' },
          { text: 'Other Components', link: '/documentation/other-components/' },
          { text: 'Dashboard', link: '/documentation/dashboard/' },
          { text: 'Gardenctl V2', link: '/documentation/gardenctl-v2/' },
          { text: 'FAQ', link: '/documentation/faq/' },
          { text: 'Glossary', link: '/documentation/glossary/' },
          { text: 'Resources', link: '/documentation/resources/' },
          { text: 'Contribute', link: '/documentation/contribute/' }
        ]
      },

      //todo
      search: {
        provider: 'algolia',
        options: {
          appId: '8J64VVRP8K',
          apiKey: '52f578a92b88ad6abde815aae2b0ad7c',
          indexName: 'vitepress'
        }
      }
    },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Guide',
      link: '/guide/what-is-vitepress',
      activeMatch: '/guide/'
    },
    {
      text: 'Blog',
      link: '/reference/site-config',
      activeMatch: '/reference/'
    },
    {
      text: 'Community',
      items: [
        {
          text: 'Slack',
          link: 'https://gardener-cloud.slack.com/join/shared_invite/zt-33c9daems-3oOorhnqOSnldZPWqGmIBw'
        },
        {
          text: 'Contributing',
          link: 'https://gardener.cloud/docs/contribute/'
        }
      ]
    }
  ]
}
