function isMobileDevice() {
    return window.innerWidth <= 768;
}

function createDropdown() {
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length == 6 && !isMobileDevice()) {
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-content';

        const dropdownItems = [
            { text: 'Users', href: '/docs' },
            { text: 'Operators', href: '/docs' },
            { text: 'Developers', href: '/docs' },
            { text: 'All', href: '/docs' }
        ];

        dropdownItems.forEach(item => {
            const a = document.createElement('a');
            a.className = 'taxonomy-term';
            a.href = item.href;
            a.textContent = item.text;

            a.addEventListener('click', function(event) {
                const allItems = dropdownMenu.querySelectorAll('.taxonomy-term');
                allItems.forEach(item => item.classList.remove('selectedTaxonomy'));
                this.classList.add('selectedTaxonomy');
            });

            dropdownMenu.appendChild(a);
        });

        navItems[2].appendChild(dropdownMenu);

        navItems[2].classList.add('dropdown');
        const navLink = navItems[2].querySelector('.nav-link');
        navLink.classList.add('dropdown-toggle');
        navLink.setAttribute('data-toggle', 'dropdown');
        navLink.setAttribute('aria-haspopup', 'true');
        navLink.setAttribute('aria-expanded', 'false');
    }
}

createDropdown();

const currentPath = window.location.pathname;

const searchString = "/docs/";
if (currentPath.includes(searchString)){

document.querySelectorAll(".taxonomy-term").forEach((el) => {
    el.addEventListener("click",(event) => {
      const roleSelected = event.currentTarget.innerHTML
      window.sessionStorage.setItem("role_selected",roleSelected)
      location.reload()
    })
})

const taxonomyTerms = Array.from(document.querySelectorAll(".taxonomy-term"))
taxonomyTerms
    .filter(tt => tt.innerHTML.includes(window.sessionStorage.getItem("role_selected")))
    .map(tt => tt.setAttribute("class","taxonomy-term selectedTaxonomy"))
linkToPersona = {
    "/": "Developers,Operators,Users",
    "/docs/": "Developers,Operators,Users",
    "/docs/dashboard/": "Operators,Users,Developers",
    "/docs/dashboard/access-restrictions/": "Operators",
    "/docs/dashboard/architecture/": "Developers",
    "/docs/dashboard/automated-resource-management/": "Users",
    "/docs/dashboard/connect-kubectl/": "Users",
    "/docs/dashboard/custom-fields/": "Users",
    "/docs/dashboard/customization/": "Operators",
    "/docs/dashboard/local-setup/": "Developers",
    "/docs/dashboard/process/": "Developers",
    "/docs/dashboard/project-operations/": "Users",
    "/docs/dashboard/terminal-shortcuts/": "Users",
    "/docs/dashboard/testing/": "Developers",
    "/docs/dashboard/using-terminal/": "Users",
    "/docs/dashboard/webterminals/": "Operators",
    "/docs/dashboard/working-with-projects/": "Users",
    "/docs/extensions/": "Operators,Developers,Users",
    "/docs/extensions/infrastructure-extensions/": "Operators,Developers,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/": "Operators,Developers,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/deployment/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/local-setup/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/tutorials/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/usage/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/": "Operators,Developers,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/deployment/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/dual-stack-ingress/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/images/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/ipv6/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/local-setup/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/tutorials/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/tutorials/kubernetes-cluster-on-aws-with-gardener/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/tutorials/kubernetes-cluster-on-aws-with-gardener/images/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/tutorials/kubernetes-cluster-on-aws-with-gardener/kubernetes-cluster-on-aws-with-gardener/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/": "Developers,Operators,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/azure-permissions/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/deployment/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/local-setup/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/tutorials/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/usage/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-equinix-metal/": "Operators,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-equinix-metal/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-equinix-metal/usage/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/": "Developers,Operators,Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/deployment/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/images/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/ipv6/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/local-setup/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/tutorials/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/usage/": "Users",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/": "Operators,Users,Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/deployment/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/local-setup/": "Developers",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/operations/": "Operators",
    "/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/usage/": "Users",
    "/docs/extensions/network-extensions/": "Operators,Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/": "Operators,Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/assets/": "Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/deployment/": "Operators",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/operations/": "Operators",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/shoot_overlay_network/": "Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-calico/usage/": "Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-cilium/": "Users",
    "/docs/extensions/network-extensions/gardener-extension-networking-cilium/usage/": "Users",
    "/docs/extensions/os-extensions/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-coreos/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-coreos/usage/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-suse-chost/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-suse-chost/usage/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-ubuntu/": "Users",
    "/docs/extensions/os-extensions/gardener-extension-os-ubuntu/usage/": "Users",
    "/docs/extensions/others/": "Operators,Users,Developers",
    "/docs/extensions/others/gardener-extension-registry-cache/": "Developers,Users",
    "/docs/extensions/others/gardener-extension-registry-cache/extension-registry-cache/": "Developers",
    "/docs/extensions/others/gardener-extension-registry-cache/getting-started-locally/": "Developers",
    "/docs/extensions/others/gardener-extension-registry-cache/getting-started-remotely/": "Developers",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-cache/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-cache/configuration/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-cache/images/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-cache/observability/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-cache/upstream-credentials/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/": "Users",
    "/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/configuration/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/": "Users,Operators",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/alerting/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/custom_shoot_issuer/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/request_cert/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-cert-service/request_default_domain_cert/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/": "Operators,Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/configuration/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/dns_names/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/dns_providers/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/gateway-api-gateways/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/istio-gateways/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-lakom-service/": "Operators,Users",
    "/docs/extensions/others/gardener-extension-shoot-lakom-service/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-lakom-service/lakom/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-lakom-service/shoot-extension/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-networking-filter/": "Users,Operators",
    "/docs/extensions/others/gardener-extension-shoot-networking-filter/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-networking-filter/shoot-networking-filter/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/": "Operators,Users",
    "/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-networking-problemdetector/shoot-networking-problemdetector/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-oidc-service/": "Users,Operators",
    "/docs/extensions/others/gardener-extension-shoot-oidc-service/deployment/": "Operators",
    "/docs/extensions/others/gardener-extension-shoot-oidc-service/openidconnects/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/": "Users,Developers",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/configuration/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/getting-started-remotely/": "Developers",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/getting-started/": "Developers",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/images/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/monitoring/": "Users",
    "/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/shoot-rsyslog-relp/": "Developers",
    "/docs/faq/": "Developers",
    "/docs/gardener/": "Developers,Operators,Users",
    "/docs/gardener/advanced/": "Users",
    "/docs/gardener/advanced/containerd-registry-configuration/": "Users",
    "/docs/gardener/advanced/control-plane-endpoints-and-ports/": "Users",
    "/docs/gardener/advanced/csi_components/": "Users",
    "/docs/gardener/advanced/custom-containerd-config/": "Users",
    "/docs/gardener/advanced/images/": "Users",
    "/docs/gardener/advanced/node-readiness/": "Users",
    "/docs/gardener/advanced/shoot_cleanup/": "Users",
    "/docs/gardener/advanced/tolerations/": "Users",
    "/docs/gardener/api-reference/": "Developers",
    "/docs/gardener/autoscaling-specifics-for-components/": "Developers",
    "/docs/gardener/autoscaling/": "Users",
    "/docs/gardener/autoscaling/dns-autoscaling/": "Users",
    "/docs/gardener/autoscaling/shoot_autoscaling/": "Users",
    "/docs/gardener/autoscaling/shoot_pod_autoscaling_best_practices/": "Users",
    "/docs/gardener/changing-the-api/": "Developers",
    "/docs/gardener/component-checklist/": "Developers",
    "/docs/gardener/concepts/": "Operators",
    "/docs/gardener/configuration/": "Operators",
    "/docs/gardener/content/": "Developers",
    "/docs/gardener/control_plane_migration/": "Operators",
    "/docs/gardener/defaulting/": "Developers",
    "/docs/gardener/dependencies/": "Developers",
    "/docs/gardener/deployment/": "Operators",
    "/docs/gardener/extensions/": "Developers",
    "/docs/gardener/gardener/": "Users",
    "/docs/gardener/gardener/gardener_info_configmap/": "Users",
    "/docs/gardener/getting_started_locally/": "Developers",
    "/docs/gardener/high-availability-of-components/": "Developers",
    "/docs/gardener/high-availability/": "Users",
    "/docs/gardener/high-availability/shoot_high_availability/": "Users",
    "/docs/gardener/high-availability/shoot_high_availability_best_practices/": "Users",
    "/docs/gardener/images/": "Operators",
    "/docs/gardener/ipv6/": "Developers",
    "/docs/gardener/istio/": "Operators",
    "/docs/gardener/kube_apiserver_loadbalancing/": "Operators",
    "/docs/gardener/kubernetes-clients/": "Developers",
    "/docs/gardener/local_setup/": "Developers",
    "/docs/gardener/log_parsers/": "Developers",
    "/docs/gardener/logging/": "Developers",
    "/docs/gardener/managed_seed/": "Operators",
    "/docs/gardener/monitoring-stack/": "Developers",
    "/docs/gardener/monitoring/": "Operators",
    "/docs/gardener/network_policies/": "Operators",
    "/docs/gardener/networking/": "Users",
    "/docs/gardener/networking/custom-dns-config/": "Users",
    "/docs/gardener/networking/dns-search-path-optimization/": "Users",
    "/docs/gardener/networking/exposureclasses/": "Users",
    "/docs/gardener/networking/images/": "Users",
    "/docs/gardener/networking/node-local-dns/": "Users",
    "/docs/gardener/networking/shoot_kubernetes_service_host_injection/": "Users",
    "/docs/gardener/networking/shoot_networking/": "Users",
    "/docs/gardener/new-cloud-provider/": "Developers",
    "/docs/gardener/new-kubernetes-version/": "Developers",
    "/docs/gardener/observability/": "Users",
    "/docs/gardener/observability/images/": "Users",
    "/docs/gardener/observability/logging/": "Users",
    "/docs/gardener/priority-classes/": "Developers",
    "/docs/gardener/process/": "Developers",
    "/docs/gardener/project/": "Users",
    "/docs/gardener/project/namespaced-cloud-profiles/": "Users",
    "/docs/gardener/project/projects/": "Users",
    "/docs/gardener/project/service-account-manager/": "Users",
    "/docs/gardener/reversed-vpn-tunnel/": "Developers",
    "/docs/gardener/secrets_management/": "Developers",
    "/docs/gardener/security/": "Users",
    "/docs/gardener/security/default_seccomp_profile/": "Users",
    "/docs/gardener/security/etcd_encryption_config/": "Users",
    "/docs/gardener/security/openidconnect-presets/": "Users",
    "/docs/gardener/security/pod-security/": "Users",
    "/docs/gardener/security/shoot_auditpolicy/": "Users",
    "/docs/gardener/security/shoot_serviceaccounts/": "Users",
    "/docs/gardener/seed_bootstrapping/": "Operators",
    "/docs/gardener/seed_settings/": "Operators",
    "/docs/gardener/shoot-operations/": "Users",
    "/docs/gardener/shoot-operations/shoot_credentials_rotation/": "Users",
    "/docs/gardener/shoot-operations/shoot_operations/": "Users",
    "/docs/gardener/shoot-operations/shoot_updates/": "Users",
    "/docs/gardener/shoot-operations/shoot_versions/": "Users",
    "/docs/gardener/shoot-operations/supported_k8s_versions/": "Users",
    "/docs/gardener/shoot-operations/worker_pool_k8s_versions/": "Users",
    "/docs/gardener/shoot/": "Users",
    "/docs/gardener/shoot/access_restrictions/": "Users",
    "/docs/gardener/shoot/shoot_access/": "Users",
    "/docs/gardener/shoot/shoot_hibernate/": "Users",
    "/docs/gardener/shoot/shoot_info_configmap/": "Users",
    "/docs/gardener/shoot/shoot_kubernetes_versions/": "Users",
    "/docs/gardener/shoot/shoot_limits/": "Users",
    "/docs/gardener/shoot/shoot_maintenance/": "Users",
    "/docs/gardener/shoot/shoot_purposes/": "Users",
    "/docs/gardener/shoot/shoot_scheduling_profiles/": "Users",
    "/docs/gardener/shoot/shoot_status/": "Users",
    "/docs/gardener/shoot/shoot_supported_architectures/": "Users",
    "/docs/gardener/shoot/shoot_workerless/": "Users",
    "/docs/gardener/shoot/shoot_workers_settings/": "Users",
    "/docs/gardener/testing/": "Developers",
    "/docs/gardener/testmachinery_tests/": "Developers",
    "/docs/gardener/topology_aware_routing/": "Operators",
    "/docs/gardener/trusted-tls-for-control-planes/": "Operators",
    "/docs/gardener/trusted-tls-for-garden-runtime/": "Operators",
    "/docs/guides/": "Developers",
    "/docs/other-components/": "Developers,Operators,Users",
    "/docs/other-components/dependency-watchdog/": "Developers",
    "/docs/other-components/dependency-watchdog/contribution/": "Developers",
    "/docs/other-components/dependency-watchdog/setup/": "Developers",
    "/docs/other-components/dependency-watchdog/setup/dwd-using-local-garden/": "Developers",
    "/docs/other-components/dependency-watchdog/testing/": "Developers",
    "/docs/other-components/etcd-druid/": "Developers,Users",
    "/docs/other-components/etcd-druid/add-new-etcd-cluster-component/": "Developers",
    "/docs/other-components/etcd-druid/api-reference/": "Developers",
    "/docs/other-components/etcd-druid/changing-api/": "Developers",
    "/docs/other-components/etcd-druid/contribution/": "Developers",
    "/docs/other-components/etcd-druid/controllers/": "Developers",
    "/docs/other-components/etcd-druid/dependency-management/": "Developers",
    "/docs/other-components/etcd-druid/getting-started-locally/": "Developers",
    "/docs/other-components/etcd-druid/managing-etcd-clusters/": "Users",
    "/docs/other-components/etcd-druid/prepare-dev-environment/": "Developers",
    "/docs/other-components/etcd-druid/raising-a-pr/": "Developers",
    "/docs/other-components/etcd-druid/recovering-etcd-clusters/": "Users",
    "/docs/other-components/etcd-druid/running-e2e-tests/": "Developers",
    "/docs/other-components/etcd-druid/securing-etcd-clusters/": "Users",
    "/docs/other-components/etcd-druid/testing/": "Developers",
    "/docs/other-components/etcd-druid/updating-documentation/": "Developers",
    "/docs/other-components/etcd-druid/using-druid-client/": "Users",
    "/docs/other-components/etcd-druid/validating-etcd-clusters/": "Users",
    "/docs/other-components/machine-controller-manager/": "Developers,Operators",
    "/docs/other-components/machine-controller-manager/cp_support_new/": "Developers",
    "/docs/other-components/machine-controller-manager/deployment/": "Operators",
    "/docs/other-components/machine-controller-manager/integration_tests/": "Developers",
    "/docs/other-components/machine-controller-manager/local_setup/": "Developers",
    "/docs/other-components/machine-controller-manager/machine/": "Operators",
    "/docs/other-components/machine-controller-manager/machine_deployment/": "Operators",
    "/docs/other-components/machine-controller-manager/machine_error_codes/": "Developers",
    "/docs/other-components/machine-controller-manager/machine_set/": "Operators",
    "/docs/other-components/machine-controller-manager/prerequisite/": "Operators",
    "/docs/other-components/machine-controller-manager/testing_and_dependencies/": "Developers",
}
const selectedPersona = window.sessionStorage.getItem("role_selected")
function shouldHide(href) {
    const personas = linkToPersona[href];
    // If there are no personas associated with the href, do not hide
    if (!personas) {
        return false;
    }
    // If the selected persona is null or "All", do not hide
    if (selectedPersona == null || selectedPersona === "All") {
        return false;
    }
    // Hide if the personas do not include the selected persona
    return !personas.includes(selectedPersona);
}
Array.from(document.querySelectorAll(".entry")).filter(el => {
    const href = el.querySelector("a").getAttribute("href");
    return shouldHide(href);
}).forEach(el => el.style.display = "none");
Array.from(document.querySelectorAll(".td-sidebar-nav__section")).filter(el => {
    const href = el.querySelector("a").getAttribute("href");    
    return shouldHide(href);
}).forEach(bel => bel.style.display = "none");

}
