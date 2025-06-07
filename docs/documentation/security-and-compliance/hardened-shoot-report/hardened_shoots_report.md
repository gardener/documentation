<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
 *,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:initial}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-feature-settings:inherit;color:inherit;font-family:inherit;font-size:100%;font-variation-settings:inherit;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:initial;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:initial}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}img,video{height:auto;max-width:100%}[hidden]{display:none}*,::backdrop,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.tw-absolute{position:absolute}.tw-relative{position:relative}.tw-right-3{right:.75rem}.tw-top-3{top:.75rem}.tw-flex{display:flex}.tw-hidden{display:none}.tw-list-inside{list-style-position:inside}.tw-list-disc{list-style-type:disc}.tw-list-none{list-style-type:none}.tw-flex-col{flex-direction:column}.tw-justify-center{justify-content:center}.tw-overflow-x-auto{overflow-x:auto}.tw-rounded{border-radius:.25rem}.tw-rounded-lg{border-radius:.5rem}.tw-bg-gray-200{--tw-bg-opacity:1;background-color:rgb(229 231 235/var(--tw-bg-opacity))}.tw-p-1{padding:.25rem}.tw-p-4{padding:1rem}.tw-px-6{padding-left:1.5rem;padding-right:1.5rem}.tw-pb-5{padding-bottom:1.25rem}.tw-pl-2{padding-left:.5rem}.tw-pl-5{padding-left:1.25rem}.tw-pr-2{padding-right:.5rem}.tw-pt-2{padding-top:.5rem}.tw-text-2xl{font-size:1.5rem;line-height:2rem}.tw-text-3xl{font-size:1.875rem;line-height:2.25rem}.tw-text-lg{font-size:1.125rem;line-height:1.75rem}.tw-text-xl{font-size:1.25rem;line-height:1.75rem}.tw-font-bold{font-weight:700}.tw-font-medium{font-weight:500}.tw-font-semibold{font-weight:600}.hover\:tw-bg-gray-100:hover{--tw-bg-opacity:1;background-color:rgb(243 244 246/var(--tw-bg-opacity))}
</style>

<style>
    .arrow {
        border: solid black;
        border-width: 0px 3px 3px 0px;
        display: inline-block;
        padding: 4px;
    }

    .right {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .left {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }

    .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
</style>
<script>
    function collapse(event) {
        const parent = event.currentTarget.parentElement
        const list = parent.getElementsByTagName('ul')[0]
        const arrow = event.currentTarget.getElementsByTagName('i')[0]

        if (list.classList.contains('tw-hidden') === true) {
            list.classList.remove('tw-hidden')
            arrow.classList.replace('right', 'down')
            return
        }

        list.classList.add('tw-hidden')
        arrow.classList.replace('down', 'right')
    }
    function cpCode(event) {
        const parent = event.currentTarget.parentElement
        const code = parent.getElementsByTagName('pre')[0].innerText
        navigator.clipboard.writeText(code);
    }
</script>
</head>

<body>
    <div class="tw-flex-col">
        <h1 class="tw-text-3xl tw-font-bold tw-pb-5 tw-pt-2 tw-flex tw-justify-center">Compliance Run (03-03-2025)</h1>
        <div class="tw-content tw-px-6">
            <span class="tw-text-2xl"><span class="tw-font-bold">Diki Version: </span>v0.14.0</span><br>
            <span><span class="tw-text-xl tw-font-bold">Glossary</span>
            <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                    class="arrow right"></i></button>
            <ul class="tw-hidden">
                <li>&#128994 Passed: Rule check has been fulfilled.</li>
                <li>&#128309 Skipped: Rule check has been considered irrelevant for the specific scenario and will not be run.</li>
                <li>&#128309 Accepted: Rule check may or may not have been run, but it was decided by the user that the check is not a finding.</li>
                <li>&#128992 Warning: Rule check has encountered an ambiguous condition or configuration preventing the ability to determine if the check is fulfilled or not.</li>
                <li>&#128308 Failed: Rule check has been unfulfilled, can be considered a finding.</li>
                <li>&#128308 Errored: Rule check has errored during runtime. It cannot be determined whether the check is fulfilled or not.</li>
                <li>&#128992 Not Implemented: Rule check has not been implemented yet.</li>
            </ul></span>
            <div>
                <label class="tw-font-bold tw-text-xl">Provider Gardener</label><br>
                <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                        class="arrow right"></i></button>
                <span class="tw-text-lg">Evaluated targets</span>
                <ul class="tw-list-disc  tw-list-inside tw-pl-5 tw-hidden">
                    <li><span class="tw-font-bold">aws</span> (gardenVirtualCloudProvider: gcp, gardenerVersion: v1.113.0, projectName: diki-comp, seedCloudProvider: aws, seedKubernetesVersion: v1.31.4, shootCloudProvider: aws, shootKubernetesVersion: v1.31.4, time: 03-03-2025 01:21:50)</li>
                    <li><span class="tw-font-bold">azure</span> (gardenVirtualCloudProvider: gcp, gardenerVersion: v1.113.0, projectName: diki-comp, seedCloudProvider: azure, seedKubernetesVersion: v1.31.4, shootCloudProvider: azure, shootKubernetesVersion: v1.31.4, time: 03-03-2025 01:23:43)</li>
                    <li><span class="tw-font-bold">gcp</span> (gardenVirtualCloudProvider: gcp, gardenerVersion: v1.113.0, projectName: diki-comp, seedCloudProvider: gcp, seedKubernetesVersion: v1.31.4, shootCloudProvider: gcp, shootKubernetesVersion: v1.31.4, time: 03-03-2025 01:25:27)</li>
                    <li><span class="tw-font-bold">openstack</span> (gardenVirtualCloudProvider: gcp, gardenerVersion: v1.113.0, projectName: diki-comp, seedCloudProvider: openstack, seedKubernetesVersion: v1.31.4, shootCloudProvider: openstack, shootKubernetesVersion: v1.31.4, time: 03-03-2025 01:27:12)</li>
                </ul>
                <ul class="tw-list-none tw-list-inside">
                    <li>
                        <span class="tw-text-lg"><span class="tw-font-semibold">v2r1 DISA Kubernetes Security Technical Implementation Guide</span> (61x Passed 🟢, 24x Skipped 🔵, 7x Accepted 🔵, 1x Failed 🔴)</span>
                        <ul class="tw-list-inside tw-pl-2">
                            <li>
                                <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                                        class="arrow right"></i></button>
                                <span class="tw-text-lg">&#128994 Passed</span>
                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242376 (Medium) - The Kubernetes Controller Manager must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-min-version has not been set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242377 (Medium) - Kubernetes Scheduler must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-min-version has not been set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242378 (Medium) - The Kubernetes API Server must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-min-version has not been set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242379 (Medium) - The Kubernetes etcd must use TLS to protect the confidentiality of sensitive data during electronic dissemination.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option client-transport-security.auto-tls set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242381 (High) - The Kubernetes Controller Manager must create unique service accounts for each work payload.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option use-service-account-credentials set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242382 (Medium) - The Kubernetes API Server must enable Node,RBAC as the authorization mode.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">AuthorizationConfiguration has expected start mode types set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: AuthorizationConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: AuthorizationConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: AuthorizationConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: AuthorizationConfiguration </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242383 (Medium) - Kubernetes must separate user functionality.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">System resource in system namespaces.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: Service name: kubernetes namespace: default </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: Service name: kubernetes namespace: default </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: Service name: kubernetes namespace: default </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: Service name: kubernetes namespace: default </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242386 (High) - The Kubernetes API server must have the insecure port flag disabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option insecure-port not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242387 (High) - The Kubernetes Kubelet must have the &#34;readOnlyPort&#34; flag disabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option readOnlyPort not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242388 (High) - The Kubernetes API server must have the insecure bind address not set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option insecure-bind-address not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242389 (Medium) - The Kubernetes API server must have the secure port set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option secure-port set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242390 (High) - The Kubernetes API server must have anonymous authentication disabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option anonymous-auth set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242391 (High) - The Kubernetes Kubelet must have anonymous authentication disabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option authentication.anonymous.enabled set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242392 (High) - The Kubernetes kubelet must enable explicit authorization.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option authorization.mode set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242393 (Medium) - Kubernetes Worker Nodes must not have sshd service running.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">SSH daemon service not installed</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242394 (Medium) - Kubernetes Worker Nodes must not have the sshd service enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">SSH daemon disabled (or could not be probed)</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242395 (Medium) - Kubernetes dashboard must not be enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Kubernetes dashboard not installed</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242397 (High) - The Kubernetes kubelet staticPodPath must not enable static pods.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option staticPodPath not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242400 (Medium) - The Kubernetes API server must have Alpha APIs disabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option featureGates.AllAlpha not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-kbb2d namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: deployment name: kube-scheduler namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242404 (Medium) - Kubernetes Kubelet must deny hostname override.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Flag hostname-override not set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242406 (Medium) - The Kubernetes kubelet configuration file must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242407 (Medium) - The Kubernetes kubelet configuration files must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /etc/systemd/system/kubelet.service, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242409 (Medium) - Kubernetes Controller Manager must disable profiling.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option profiling set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242414 (Medium) - The Kubernetes cluster must use non-privileged host ports for user pods.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Container does not use hostPort &lt; 1024.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: aws-custom-route-controller-7ff4fc4484-qv57g namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-9689c845f-9df2r namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-9689c845f-m54ws namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-69bb8446bd-dml56 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-84878d787c-s2rmt namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-b956d9c46-c4rkx namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-7788f5f8f4-sfkbh namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-7788f5f8f4-zpwlk namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: event-logger-777d6dc9b8-ctw2m namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-59977dbc9-cdhjv namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-59977dbc9-fh89r namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-69cc9894f8-jnh7b namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-69cc9894f8-nkb25 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-7c5459cc5b-jkvn9 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-77546995b-rk69t namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-59764d7c75-4dr9j namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-59764d7c75-4dr9j namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-5c744b5c9d-97kpz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: plutono-67955bdb48-948jl namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: plutono-67955bdb48-948jl namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: plutono-67955bdb48-948jl namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: plutono-67955bdb48-948jl namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-8644c5f898-x9562 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-6d65958cbc-8m4ld namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-6d65958cbc-rvtlt namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-7d8c68d577-bvdvs namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-66dc94789-pcdfh namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-5f5cc9c687-s6fqv namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-5f5cc9c687-s6fqv namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vx2f2 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vx2f2 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-xhcc8 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-xhcc8 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-9fnsl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-tdqhz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-pcfkz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-pcfkz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-qtt99 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-qtt99 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-sdcrg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-9p7ch namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-lw7d7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-d5x8l namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-5btm4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-5474587df-5cwh6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-5474587df-ztxck namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-54lnt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-54lnt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-54lnt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-p7v8p namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-p7v8p namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-p7v8p namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: diki-242452-pud4u4zryg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-c59zt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-q5j8f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-n2kgl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-n2kgl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-c57587bbf-qqjfw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-c57587bbf-xnztf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-cpllg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-tzzf4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-d5p9q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-jbnxw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-g4cm7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-lp96f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-8699c namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-plwx6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-767fd85bcd-znxkl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-7bbbdbf85f-j4k9w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-7bbbdbf85f-lljfd namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-7d455c88b9-h6bwz namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-6b8ccc589c-4q5ws namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-b6cf5d7c8-5cwxj namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: event-logger-5b675bd46f-b6tk6 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-5fc9cb4b98-7dpdq namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-5fc9cb4b98-99ptw namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-668c56d4cb-cnvhp namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-668c56d4cb-s8hbt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-78d668b498-g4nbj namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-696c7f9988-s76vt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-5858dd8f98-2ffrn namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-5858dd8f98-2ffrn namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-58d8898bc-942ss namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: plutono-8cbb4fc48-kbsnv namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: plutono-8cbb4fc48-kbsnv namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: plutono-8cbb4fc48-kbsnv namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: plutono-8cbb4fc48-kbsnv namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: remedy-controller-azure-6bc55767c7-ftbcp namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-678487b956-97xj4 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-569c498d7b-7q4tx namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-569c498d7b-qlrs4 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-846d654554-2drz8 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-566f48ffdb-6s8tf namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-858fb7754d-gsrmq namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-858fb7754d-gsrmq namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-n867f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-n867f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vgjf5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vgjf5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-22l8z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-zml66 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-grwcc namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-pzs6z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-x7kcf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-nmnvp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-q4fk4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-jsc5w namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-hwb57 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: cloud-node-manager-5cl6f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: cloud-node-manager-tt2p6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-696f69cb6c-9b8zt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-696f69cb6c-kk7lz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-j7kk6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-j7kk6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-j7kk6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-kcqsm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-kcqsm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-kcqsm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rfl7m namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rfl7m namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rfl7m namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rmq5z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rmq5z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rmq5z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-22rv7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-hwmmx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-ncssj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-ncssj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-85c898cb58-22fjd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-85c898cb58-28w8v namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-cfxbx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-sg989 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-mcz27 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-x8866 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-qqjnh namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-r7fkg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-5n2x6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-w4r4t namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-dddcfbd9c-hzxzl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-5787b8dcf7-gbftg namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-5787b8dcf7-mb8gx namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-8577478fbb-jzwtz namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-75b656c795-r2f28 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-7f896fb559-2c9ps namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-5c8bf6f599-4vhm7 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-5c8bf6f599-9m5d4 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: event-logger-8c7d7bf97-hlh8w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-fdcfbd686-l8d6r namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-fdcfbd686-wqtxv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-5f87b9f6b-kww5m namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-5f87b9f6b-sh7vc namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-857b9bd577-knjdp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-d87d8b4f-htgkt namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-8594568fcd-r78cf namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-8594568fcd-r78cf namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-cbbb474fb-5jh9j namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: plutono-85bbd7ddbc-2kzlv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: plutono-85bbd7ddbc-2kzlv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: plutono-85bbd7ddbc-2kzlv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: plutono-85bbd7ddbc-2kzlv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-65bc698487-7pdmm namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-755d64fd45-ghlhr namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-755d64fd45-hp27b namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-5f67c44999-kzjsn namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-5df7f89ff-xk2bz namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-6f5655998-kmqzq namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-6f5655998-kmqzq namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-bx978 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-bx978 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-r9tdg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-r9tdg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-bdhqb namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-fvbxj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-n95k5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-zl5pz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-ztwrg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-2l4cw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-q5rtd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-fwc5h namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-vwmzw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-65bdc57f48-b26c5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-65bdc57f48-tq2b5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-6lmpl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-6lmpl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-6lmpl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-srz2q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-srz2q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-srz2q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: diki-242394-ug7v34g0by namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-6cqn6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-jschk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-kbb2d namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-kbb2d namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-944fcbdc8-fp5jr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-944fcbdc8-n7hxj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-2nxh4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-xbq6b namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-drdls namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-qdrkq namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-4q9wx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-c5zhw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-h8g4k namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-k9hz9 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-66b756699d-82sjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-796cfcbd7b-5xhnd namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-796cfcbd7b-x872d namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-768f7754d7-5vfn6 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-775878f68d-266rq namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-5697d75668-lnp8v namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-695ddb7d8f-s5s6r namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-695ddb7d8f-wpqd4 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: event-logger-7c4585694-pzqsn namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-57c6965d79-9sqs8 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-57c6965d79-x5877 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-7498f9645d-9cctf namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-7498f9645d-vxb6k namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-5d6dcc9bd5-fvxd7 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-fb5bddd9f-phl5z namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-d4b9f98c8-2pz7r namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-d4b9f98c8-2pz7r namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-54c89cd46f-r82lt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: plutono-76985fdb86-hn9hx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: plutono-76985fdb86-hn9hx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: plutono-76985fdb86-hn9hx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: plutono-76985fdb86-hn9hx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-c9f5c8d89-27psp namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-9cd65b667-dfglc namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-9cd65b667-j5ncm namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-74d78b8fd6-9h8sw namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-5dcf7dbf74-ftrl2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-77d6864c94-46wzx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-77d6864c94-46wzx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-cxrkt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-cxrkt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-ql792 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-ql792 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-7l9sk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-cqtvr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-kube-controllers-5757b9f7fd-lfpk9 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-95h7z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-95h7z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-fnzkc namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-fnzkc namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-fd557 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-9xhk8 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-rktmq namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-zcxqr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-s4z6h namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-7779b6b486-46b9q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-7779b6b486-9fvwj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-66tql namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-66tql namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-66tql namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-7bsvw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-7bsvw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-7bsvw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-pwvjp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-tzmbv namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-jjnqj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-jjnqj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-7ccb5488f7-6cf26 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-7ccb5488f7-wmqrp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-8swgm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-khwzh namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-f7m96 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-w77jp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-5tjpp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-v9hjf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-kdf5d namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-mngdd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-587d6569f5-9z27v namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242415 (High) - Secrets in Kubernetes must not be stored as environment variables.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Pod does not use environment to inject secret.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: aws-custom-route-controller-7ff4fc4484-qv57g namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-9689c845f-9df2r namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-9689c845f-m54ws namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-69bb8446bd-dml56 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-84878d787c-s2rmt namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-dfc558d68-lwwh5 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-b956d9c46-c4rkx namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-7788f5f8f4-sfkbh namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-7788f5f8f4-zpwlk namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: event-logger-777d6dc9b8-ctw2m namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-59977dbc9-cdhjv namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-59977dbc9-fh89r namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-69cc9894f8-jnh7b namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-69cc9894f8-nkb25 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-7c5459cc5b-jkvn9 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-77546995b-rk69t namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-59764d7c75-4dr9j namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-5c744b5c9d-97kpz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: plutono-67955bdb48-948jl namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-8644c5f898-x9562 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-6d65958cbc-8m4ld namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-6d65958cbc-rvtlt namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-7d8c68d577-872bw namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-66dc94789-pcdfh namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-5f5cc9c687-s6fqv namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vx2f2 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-xhcc8 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-9fnsl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-tdqhz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-pcfkz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-qtt99 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-sdcrg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-9p7ch namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-lw7d7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-d5x8l namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-5btm4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-5474587df-5cwh6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-5474587df-ztxck namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-54lnt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-p7v8p namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-c59zt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-q5j8f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-n2kgl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-c57587bbf-qqjfw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-c57587bbf-xnztf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-cpllg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-tzzf4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-d5p9q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-jbnxw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-g4cm7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-lp96f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-7hq55 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-bg64b namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-8699c namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-plwx6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-767fd85bcd-znxkl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-7bbbdbf85f-j4k9w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-7bbbdbf85f-lljfd namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-7d455c88b9-h6bwz namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-6b8ccc589c-4q5ws namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-disk-f96f8845f-7gxlg namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-file-6f4894f8db-q6p4w namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-b6cf5d7c8-5cwxj namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: event-logger-5b675bd46f-b6tk6 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-5fc9cb4b98-7dpdq namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-5fc9cb4b98-99ptw namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-668c56d4cb-cnvhp namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-668c56d4cb-s8hbt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-78d668b498-g4nbj namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-696c7f9988-s76vt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-5858dd8f98-2ffrn namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-58d8898bc-942ss namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: plutono-8cbb4fc48-kbsnv namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: remedy-controller-azure-6bc55767c7-ftbcp namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-678487b956-97xj4 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-569c498d7b-7q4tx namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-569c498d7b-qlrs4 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-846d654554-2drz8 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-566f48ffdb-6s8tf namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-858fb7754d-gsrmq namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-n867f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-vgjf5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-22l8z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-zml66 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-grwcc namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-pzs6z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-x7kcf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-nmnvp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-q4fk4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-jsc5w namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-hwb57 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: cloud-node-manager-5cl6f namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: cloud-node-manager-tt2p6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-696f69cb6c-9b8zt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-696f69cb6c-kk7lz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-j7kk6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-disk-kcqsm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rfl7m namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-file-rmq5z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: diki-242400-l5l43zx449 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-22rv7 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-hwmmx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-ncssj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-85c898cb58-22fjd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-85c898cb58-28w8v namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-cfxbx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-sg989 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-mcz27 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-x8866 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-qqjnh namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-r7fkg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-t252j namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-v42pz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-5n2x6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-w4r4t namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-dddcfbd9c-hzxzl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-5787b8dcf7-gbftg namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-5787b8dcf7-mb8gx namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-8577478fbb-jzwtz namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-75b656c795-r2f28 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-9f54d87d4-tq92g namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-7f896fb559-2c9ps namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-5c8bf6f599-4vhm7 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-5c8bf6f599-9m5d4 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: event-logger-8c7d7bf97-hlh8w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-fdcfbd686-l8d6r namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-fdcfbd686-wqtxv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-5f87b9f6b-kww5m namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-5f87b9f6b-sh7vc namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-857b9bd577-knjdp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-d87d8b4f-htgkt namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-8594568fcd-r78cf namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-cbbb474fb-5jh9j namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: plutono-85bbd7ddbc-2kzlv namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-65bc698487-7pdmm namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-755d64fd45-ghlhr namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-755d64fd45-hp27b namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-5f67c44999-kzjsn namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-5df7f89ff-xk2bz namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-6f5655998-kmqzq namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-bx978 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-r9tdg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-bdhqb namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-fvbxj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-n95k5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-zl5pz namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-ztwrg namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-2l4cw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-q5rtd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-fwc5h namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-vwmzw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-65bdc57f48-b26c5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-65bdc57f48-tq2b5 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-6lmpl namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-srz2q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-6cqn6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-jschk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-kbb2d namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-944fcbdc8-fp5jr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-944fcbdc8-n7hxj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-2nxh4 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-xbq6b namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-drdls namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-qdrkq namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-4q9wx namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-c5zhw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-4hxs6 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-f7kfv namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-h8g4k namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-k9hz9 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-66b756699d-82sjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-796cfcbd7b-5xhnd namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: blackbox-exporter-796cfcbd7b-x872d namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: cert-controller-manager-768f7754d7-5vfn6 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: cloud-controller-manager-775878f68d-266rq namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-driver-controller-64f6c45c55-j8z7c namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-controller-5697d75668-lnp8v namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-695ddb7d8f-s5s6r namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: csi-snapshot-validation-695ddb7d8f-wpqd4 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: event-logger-7c4585694-pzqsn namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-57c6965d79-9sqs8 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: extension-shoot-lakom-service-57c6965d79-x5877 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-7498f9645d-9cctf namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: gardener-resource-manager-7498f9645d-vxb6k namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-5d6dcc9bd5-fvxd7 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: kube-state-metrics-fb5bddd9f-phl5z namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: machine-controller-manager-d4b9f98c8-2pz7r namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: network-problem-detector-controller-54c89cd46f-r82lt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: plutono-76985fdb86-hn9hx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: prometheus-shoot-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: shoot-dns-service-c9f5c8d89-27psp namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vali-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-9cd65b667-dfglc namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-admission-controller-9cd65b667-j5ncm namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-recommender-74d78b8fd6-9h8sw namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpa-updater-5dcf7dbf74-ftrl2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed kind: pod name: vpn-seed-server-77d6864c94-46wzx namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-cxrkt namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: apiserver-proxy-ql792 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-7l9sk namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: blackbox-exporter-6cb7b4b76c-cqtvr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-kube-controllers-5757b9f7fd-lfpk9 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-95h7z namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-fnzkc namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-fd557 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-9xhk8 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-deploy-6959bc47cf-rktmq namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-zcxqr namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: calico-typha-vertical-autoscaler-757978cc5-s4z6h namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-7779b6b486-46b9q namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: coredns-7779b6b486-9fvwj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-66tql namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: csi-driver-node-7bsvw namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: diki-242393-wcceob1mzp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: diki-242453-mt4hvqywz1 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-pwvjp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: egress-filter-applier-tzmbv namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-jjnqj namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-7ccb5488f7-6cf26 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: metrics-server-7ccb5488f7-wmqrp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-8swgm namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-host-khwzh namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-f7m96 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: network-problem-detector-pod-w77jp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-5tjpp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-exporter-v9hjf namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-28vpp namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-local-dns-b4bn9 namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-kdf5d namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: node-problem-detector-mngdd namespace: kube-system </li>
                                                            <li>cluster: shoot kind: pod name: vpn-shoot-587d6569f5-9z27v namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242417 (Medium) - Kubernetes must separate user functionality.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener managed pods are not user pods</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: pod name: apiserver-proxy-vx2f2 namespace: kube-system </li>
                                                            <li>kind: pod name: apiserver-proxy-xhcc8 namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-9fnsl namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-tdqhz namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-pcfkz namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-qtt99 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-sdcrg namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-9p7ch namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-lw7d7 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-d5x8l namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-vertical-autoscaler-757978cc5-5btm4 namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-5474587df-5cwh6 namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-5474587df-ztxck namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-54lnt namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-p7v8p namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-c59zt namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-q5j8f namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-n2kgl namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-c57587bbf-qqjfw namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-c57587bbf-xnztf namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-cpllg namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-tzzf4 namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-d5p9q namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-jbnxw namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-g4cm7 namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-lp96f namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-7hq55 namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-bg64b namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-8699c namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-plwx6 namespace: kube-system </li>
                                                            <li>kind: pod name: vpn-shoot-767fd85bcd-znxkl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: pod name: apiserver-proxy-n867f namespace: kube-system </li>
                                                            <li>kind: pod name: apiserver-proxy-vgjf5 namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-22l8z namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-dnzp8 namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-zml66 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-grwcc namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-pzs6z namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-x7kcf namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-nmnvp namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-q4fk4 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-jsc5w namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-vertical-autoscaler-757978cc5-hwb57 namespace: kube-system </li>
                                                            <li>kind: pod name: cloud-node-manager-5cl6f namespace: kube-system </li>
                                                            <li>kind: pod name: cloud-node-manager-tt2p6 namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-696f69cb6c-9b8zt namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-696f69cb6c-kk7lz namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-disk-j7kk6 namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-disk-kcqsm namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-file-rfl7m namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-file-rmq5z namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-22rv7 namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-hwmmx namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-ncssj namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-85c898cb58-22fjd namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-85c898cb58-28w8v namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-cfxbx namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-sg989 namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-mcz27 namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-x8866 namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-qqjnh namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-r7fkg namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-t252j namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-v42pz namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-5n2x6 namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-w4r4t namespace: kube-system </li>
                                                            <li>kind: pod name: vpn-shoot-dddcfbd9c-hzxzl namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: pod name: apiserver-proxy-bx978 namespace: kube-system </li>
                                                            <li>kind: pod name: apiserver-proxy-r9tdg namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-bdhqb namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-fvbxj namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-n95k5 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-zl5pz namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-ztwrg namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-2l4cw namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-q5rtd namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-fwc5h namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-vertical-autoscaler-757978cc5-vwmzw namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-65bdc57f48-b26c5 namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-65bdc57f48-tq2b5 namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-6lmpl namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-srz2q namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-6cqn6 namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-jschk namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-bex82-v1.31.4-kbb2d namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-944fcbdc8-fp5jr namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-944fcbdc8-n7hxj namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-2nxh4 namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-xbq6b namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-drdls namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-qdrkq namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-4q9wx namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-c5zhw namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-4hxs6 namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-f7kfv namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-h8g4k namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-k9hz9 namespace: kube-system </li>
                                                            <li>kind: pod name: vpn-shoot-66b756699d-82sjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: pod name: apiserver-proxy-cxrkt namespace: kube-system </li>
                                                            <li>kind: pod name: apiserver-proxy-ql792 namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-7l9sk namespace: kube-system </li>
                                                            <li>kind: pod name: blackbox-exporter-6cb7b4b76c-cqtvr namespace: kube-system </li>
                                                            <li>kind: pod name: calico-kube-controllers-5757b9f7fd-lfpk9 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-95h7z namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-fnzkc namespace: kube-system </li>
                                                            <li>kind: pod name: calico-node-vertical-autoscaler-66fbc8cdf9-fd557 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-9xhk8 namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-deploy-6959bc47cf-rktmq namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-horizontal-autoscaler-7d8cf6f7b4-zcxqr namespace: kube-system </li>
                                                            <li>kind: pod name: calico-typha-vertical-autoscaler-757978cc5-s4z6h namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-7779b6b486-46b9q namespace: kube-system </li>
                                                            <li>kind: pod name: coredns-7779b6b486-9fvwj namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-66tql namespace: kube-system </li>
                                                            <li>kind: pod name: csi-driver-node-7bsvw namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-pwvjp namespace: kube-system </li>
                                                            <li>kind: pod name: egress-filter-applier-tzmbv namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-dqty2-v1.31.4-jjnqj namespace: kube-system </li>
                                                            <li>kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-7ccb5488f7-6cf26 namespace: kube-system </li>
                                                            <li>kind: pod name: metrics-server-7ccb5488f7-wmqrp namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-8swgm namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-host-khwzh namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-f7m96 namespace: kube-system </li>
                                                            <li>kind: pod name: network-problem-detector-pod-w77jp namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-5tjpp namespace: kube-system </li>
                                                            <li>kind: pod name: node-exporter-v9hjf namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-28vpp namespace: kube-system </li>
                                                            <li>kind: pod name: node-local-dns-b4bn9 namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-kdf5d namespace: kube-system </li>
                                                            <li>kind: pod name: node-problem-detector-mngdd namespace: kube-system </li>
                                                            <li>kind: pod name: vpn-shoot-587d6569f5-9z27v namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242418 (Medium) - The Kubernetes API server must use approved cipher suites.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-cipher-suites set to allowed values.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242419 (Medium) - Kubernetes API Server must have the SSL Certificate Authority set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option client-ca-file set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242420 (Medium) - Kubernetes Kubelet must have the SSL Certificate Authority set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option authentication.x509.clientCAFile set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242421 (Medium) - Kubernetes Controller Manager must have the SSL Certificate Authority set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option root-ca-file set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-controller-manager namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242422 (Medium) - Kubernetes API Server must have a certificate for communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-cert-file set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option tls-private-key-file set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242423 (Medium) - Kubernetes etcd must enable client authentication to secure service.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option client-transport-security.client-cert-auth set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242424 (Medium) - Kubernetes Kubelet must enable tlsPrivateKeyFile for client authentication to secure service.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Kubelet rotates server certificates automatically itself.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242425 (Medium) - Kubernetes Kubelet must enable tlsCertFile for client authentication to secure service.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Kubelet rotates server certificates automatically itself.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242427 (Medium) - Kubernetes etcd must have a key file for secure communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option client-transport-security.key-file set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242428 (Medium) - Kubernetes etcd must have a certificate for communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option client-transport-security.cert-file set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242429 (Medium) - Kubernetes etcd must have the SSL Certificate Authority set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option etcd-cafile set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242430 (Medium) - Kubernetes etcd must have a certificate for communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option etcd-certfile set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242431 (Medium) - Kubernetes etcd must have a key file for secure communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option etcd-keyfile set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242434 (High) - Kubernetes Kubelet must enable kernel protection.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option protectKernelDefaults set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242436 (High) - The Kubernetes API server must have the ValidatingAdmissionWebhook enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option enable-admission-plugins set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242438 (Medium) - Kubernetes API Server must configure timeouts to limit attack surface.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option request-timeout has not been set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: defaults to 1m0s kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: defaults to 1m0s kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: defaults to 1m0s kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: defaults to 1m0s kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242442 (Medium) - Kubernetes must remove old components after updated versions have been installed.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">All found images use current versions.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242445 (Medium) - The Kubernetes component etcd must be owned by etcd.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.3362730748/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/accessKeyID, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/bucketName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/region, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/secretAccessKey, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_01.108378467/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.402852323/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_01.1094665409/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.1112355822/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/storageKey, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/bucketName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/storageAccount, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_09.1473205331/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.4148787187/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_09.3979181729/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_10.2542207060/bucketName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_10.2542207060/serviceaccount.json, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_10.4061322218/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.3857247242/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_10.3425273932/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.1333348608/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_05.913416246/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_05.4090004166/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_06.2507918529/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialSecret, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/authURL, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/bucketName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/domainName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/region, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/tenantName, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialID, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0.tmp, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/snap/db, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/safe_guard, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_06.3871353697/etcd.conf.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/token, ownerUser: 65532, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/namespace, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242446 (Medium) - The Kubernetes conf files must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_51.2065093033/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_51.3826556335/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_51.2019118523/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_51.2019118523/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_13_50.3972196173/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_13_50.3890899486/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_13_50.680304539/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_13_50.680304539/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_52.2699305413/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_52.4078078265/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_52.689706272/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_52.1369411553/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_52.1447808254/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_12_52.832936945/static_tokens.csv, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_12_52.486086435/audit-policy.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_52.357858322/podsecurity.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_52.357858322/admission-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_12_52.1226153874/encryption-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_52.1763016478/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_12_52.2580397749/egress-selector-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_52.1090624067/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_52.3384748314/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_12_52.3590438838/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_12_52.1573721038/node-agent-authorizer-kubeconfig.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_45.1500377092/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_14_45.1357350738/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_14_45.737211032/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_14_45.737211032/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_10_45.274742397/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_10_45.864706336/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_45.121736196/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_45.121736196/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca/..2025_03_03_01_15_45.490470259/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_15_45.439326823/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_15_45.1918001777/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_15_45.3156265392/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_15_45.731119053/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_15_45.686938039/static_tokens.csv, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_15_45.1971687659/audit-policy.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_15_45.355533268/podsecurity.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_15_45.355533268/admission-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_15_45.1979425120/encryption-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_15_45.2369293391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_15_45.587715866/egress-selector-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_15_45.3923805873/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_15_45.3336896937/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_15_45.289722142/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_15_45.3971532155/node-agent-authorizer-kubeconfig.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_36.1174479734/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_36.1728520434/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_36.3572642423/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_36.1776806755/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_36.2525007222/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_12_36.773770721/static_tokens.csv, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_12_36.1416965152/audit-policy.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_36.631428973/podsecurity.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_36.631428973/admission-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_12_36.2591932554/encryption-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_36.2145202368/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_12_36.3766393744/egress-selector-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_36.282363630/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_36.3945965329/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_12_36.2067107765/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_12_36.399083477/node-agent-authorizer-kubeconfig.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_09_35.3955725141/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_09_35.1550550768/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_09_35.2841337904/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_09_35.2841337904/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca/..2025_03_03_01_16_36.2922815650/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_16_36.1502439632/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_16_36.3218948895/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_16_36.3218948895/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca/..2025_03_03_01_10_31.235358473/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_10_31.493633103/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_31.1519645152/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_31.1519645152/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_12_28.1885206071/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_12_28.3053481480/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_28.705390985/kubeconfig, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_28.705390985/token, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_29.407171975/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_29.2499436981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_14_29.2116021732/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_14_29.3091365546/id_rsa, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_14_29.3490774438/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_14_29.1078480729/static_tokens.csv, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_14_29.1344451113/audit-policy.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_14_29.1664806219/podsecurity.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_14_29.1664806219/admission-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_14_29.50359616/encryption-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_14_29.4102013387/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_14_29.528667485/egress-selector-configuration.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_29.1069799842/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_14_29.3554070821/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_14_29.1394916609/config.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_14_29.4088325230/node-agent-authorizer-kubeconfig.yaml, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242447 (Medium) - The Kubernetes Kube Proxy kubeconfig must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, permissions: 644 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, permissions: 644 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, permissions: 644 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, permissions: 644 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, permissions: 644 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, permissions: 644 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, permissions: 644 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, permissions: 644 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242448 (Medium) - The Kubernetes Kube Proxy kubeconfig must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~configmap/kube-proxy-config/config.yaml, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~secret/kubeconfig/kubeconfig, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242449 (Medium) - The Kubernetes Kubelet certificate authority file must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, permissions: 644 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, permissions: 644 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, permissions: 644 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, permissions: 644 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242450 (Medium) - The Kubernetes Kubelet certificate authority must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/ca.crt, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242451 (Medium) - The Kubernetes component PKI must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.3362730748/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.3362730748, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.402852323/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.402852323, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_52.2699305413/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_52.4078078265/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_52.689706272/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_52.1447808254/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_52.1763016478/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_52.1090624067/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_52.3384748314/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_52.2699305413, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_52.4078078265, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_52.689706272, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_52.1447808254, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_52.1763016478, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_52.1090624067, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_52.3384748314, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_51.2065093033/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_51.2065093033, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_13_50.3972196173/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_13_50.3972196173, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-12.pem, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-55.pem, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.4148787187/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.4148787187, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_45.1500377092/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_45.1500377092, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_10_45.274742397/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_10_45.274742397, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.1112355822/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.1112355822, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca/..2025_03_03_01_15_45.490470259/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_15_45.439326823/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_15_45.1918001777/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_15_45.731119053/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_15_45.2369293391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_15_45.3923805873/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_15_45.3336896937/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_15_45.1918001777, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_15_45.731119053, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_15_45.3923805873, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca/..2025_03_03_01_15_45.490470259, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_15_45.439326823, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_15_45.2369293391, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_15_45.3336896937, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-13.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-10-06.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.1333348608/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.1333348608, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca/..2025_03_03_01_16_36.2922815650/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca/..2025_03_03_01_16_36.2922815650, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_36.1174479734/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_36.1728520434/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_36.3572642423/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_36.2525007222/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_36.2145202368/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_36.282363630/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_36.3945965329/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_36.2145202368, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_36.282363630, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_36.1174479734, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_36.1728520434, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_36.3572642423, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_36.2525007222, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_36.3945965329, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_09_35.3955725141/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_09_35.3955725141, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.3857247242/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.3857247242, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-08-29.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-07-27.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_05.913416246/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_05.913416246, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_29.407171975/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_29.2499436981/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_14_29.2116021732/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_14_29.3490774438/bundle.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_14_29.4102013387/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_29.1069799842/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_14_29.3554070821/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_14_29.4102013387, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_14_29.3554070821, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_29.407171975, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_14_29.2116021732, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_29.1069799842, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_29.2499436981, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_14_29.3490774438, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca/..2025_03_03_01_10_31.235358473/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca/..2025_03_03_01_10_31.235358473, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_12_28.1885206071/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_12_28.1885206071, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836, ownerUser: 0, ownerGroup: 65532 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_06.2507918529/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_06.2507918529, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998, ownerUser: 0, ownerGroup: 65532 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-31.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-40.pem, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420/ca.crt, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420, ownerUser: 0, ownerGroup: 0 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242452 (Medium) - The Kubernetes kubelet KubeConfig must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242453 (Medium) - The Kubernetes kubelet KubeConfig file must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected owners</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, ownerUser: 0, ownerGroup: 0 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: fileName: /var/lib/kubelet/kubeconfig-real, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>details: fileName: /var/lib/kubelet/config/kubelet, ownerUser: 0, ownerGroup: 0 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242459 (Medium) - The Kubernetes etcd must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.3362730748/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/accessKeyID, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/bucketName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/region, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_01.4053552407/secretAccessKey, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-5fd75c6b-82f4-4e32-97b1-ed522efea2b6/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_01.108378467/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.402852323/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~csi/pv-shoot--garden--aws-ha-eu1-1f0559c1-d2d6-4fbc-a896-f9f3b569ecc0/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_01.1094665409/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.1112355822/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/storageKey, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/bucketName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_09.2736915275/storageAccount, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-81b2d8c1-722b-460c-92ce-9906a186289f/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_09.1473205331/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.4148787187/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~csi/pv-shoot--garden--az-ha-eu1-33b95d75-a9cf-4e74-8dda-794e03889079/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_09.3979181729/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.3857247242/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_10.2542207060/bucketName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_10.2542207060/serviceaccount.json, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~csi/pv--d18c09ba-ce50-475d-88d3-cad4eb603f5c/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_10.4061322218/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.1333348608/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~csi/pv--07f5ab52-a744-4aed-a9b6-de384c841487/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_10.3425273932/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_06.2507918529/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialSecret, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/authURL, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/bucketName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/domainName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/region, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/tenantName, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-backup-secret/..2025_03_03_01_02_06.4250764035/applicationCredentialID, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-d359d687-b56a-4021-9607-7dec21e0a35d/mount/safe_guard, permissions: 600 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_06.3871353697/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/token, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~configmap/etcd-config-file/..2025_03_03_01_02_05.4090004166/etcd.conf.yaml, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/safe_guard, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/snap/db, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0.tmp, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~csi/pv-shoot--garden--cc-ha-eu1-8f4bdf35-bd60-4e8c-b357-63a805f65254/mount/new.etcd/member/wal/0000000000000000-0000000000000000.wal, permissions: 600 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_05.913416246/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/token, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242460 (Medium) - The Kubernetes admin.conf must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_51.2065093033/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_51.3826556335/id_rsa, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_51.2019118523/kubeconfig, permissions: 644 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_51.2019118523/token, permissions: 644 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_13_50.3972196173/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.crt, permissions: 640 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.key, permissions: 640 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_13_50.3890899486/config.yaml, permissions: 644 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_13_50.680304539/kubeconfig, permissions: 644 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_13_50.680304539/token, permissions: 644 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_52.2699305413/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_52.4078078265/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_52.689706272/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_52.1369411553/id_rsa, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_52.1447808254/bundle.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_12_52.832936945/static_tokens.csv, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_12_52.486086435/audit-policy.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_52.357858322/podsecurity.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_52.357858322/admission-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_12_52.1226153874/encryption-configuration.yaml, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_52.1763016478/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_12_52.2580397749/egress-selector-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_52.1090624067/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_52.3384748314/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/ca.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_12_52.3590438838/config.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_12_52.1573721038/node-agent-authorizer-kubeconfig.yaml, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca/..2025_03_03_01_15_45.490470259/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_15_45.439326823/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_15_45.1918001777/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_15_45.3156265392/id_rsa, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_15_45.731119053/bundle.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_15_45.686938039/static_tokens.csv, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_15_45.1971687659/audit-policy.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_15_45.355533268/podsecurity.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_15_45.355533268/admission-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_15_45.1979425120/encryption-configuration.yaml, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_15_45.2369293391/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_15_45.587715866/egress-selector-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_15_45.3923805873/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_15_45.3336896937/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/ca.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_15_45.289722142/config.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_15_45.3971532155/node-agent-authorizer-kubeconfig.yaml, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_45.1500377092/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_14_45.1357350738/id_rsa, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_14_45.737211032/kubeconfig, permissions: 644 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_14_45.737211032/token, permissions: 644 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_10_45.274742397/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.key, permissions: 640 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.crt, permissions: 640 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_10_45.864706336/config.yaml, permissions: 644 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_45.121736196/kubeconfig, permissions: 644 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_45.121736196/token, permissions: 644 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca/..2025_03_03_01_16_36.2922815650/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_16_36.1502439632/id_rsa, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_16_36.3218948895/kubeconfig, permissions: 644 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_16_36.3218948895/token, permissions: 644 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_36.1174479734/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_36.1728520434/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_36.3572642423/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_12_36.1776806755/id_rsa, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_36.2525007222/bundle.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_12_36.773770721/static_tokens.csv, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_12_36.1416965152/audit-policy.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_36.631428973/podsecurity.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_12_36.631428973/admission-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_12_36.2591932554/encryption-configuration.yaml, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_36.2145202368/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_12_36.3766393744/egress-selector-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_36.282363630/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_36.3945965329/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/ca.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_12_36.2067107765/config.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_12_36.399083477/node-agent-authorizer-kubeconfig.yaml, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_09_35.3955725141/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.crt, permissions: 640 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.key, permissions: 640 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_09_35.1550550768/config.yaml, permissions: 644 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_09_35.2841337904/kubeconfig, permissions: 644 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_09_35.2841337904/token, permissions: 644 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca/..2025_03_03_01_10_31.235358473/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_10_31.493633103/id_rsa, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_31.1519645152/kubeconfig, permissions: 644 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_10_31.1519645152/token, permissions: 644 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_12_28.1885206071/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.crt, permissions: 640 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.key, permissions: 640 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~configmap/kube-scheduler-config/..2025_03_03_01_12_28.3053481480/config.yaml, permissions: 644 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_28.705390985/kubeconfig, permissions: 644 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/kubeconfig/..2025_03_03_01_12_28.705390985/token, permissions: 644 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_29.407171975/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_29.2499436981/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_14_29.2116021732/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key/..2025_03_03_01_14_29.3091365546/id_rsa, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_14_29.3490774438/bundle.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/static-token/..2025_03_03_01_14_29.1078480729/static_tokens.csv, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/audit-policy-config/..2025_03_03_01_14_29.1344451113/audit-policy.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_14_29.1664806219/podsecurity.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/admission-config/..2025_03_03_01_14_29.1664806219/admission-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-encryption-secret/..2025_03_03_01_14_29.50359616/encryption-configuration.yaml, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_14_29.4102013387/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/egress-selection-config/..2025_03_03_01_14_29.528667485/egress-selector-configuration.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_29.1069799842/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_14_29.3554070821/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/ca.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~configmap/authorization-config/..2025_03_03_01_14_29.1394916609/config.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/authorization-kubeconfigs/..2025_03_03_01_14_29.4088325230/node-agent-authorizer-kubeconfig.yaml, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242461 (Medium) - The Kubernetes API Server audit logs must be enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option audit-policy-file set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242466 (Medium) - The Kubernetes PKI CRT must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.732820315/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.3362730748/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_01.402852323/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_01.4042300612/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_52.2699305413/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_52.4078078265/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_52.689706272/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_52.1763016478/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_52.1090624067/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_52.3384748314/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/ca.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.crt, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_51.2065093033/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_13_50.3972196173/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.crt, permissions: 640 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-12.pem, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-55.pem, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/67fdc3bf-da6b-4131-84b0-3facad7ed698/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_15_17.1796558607/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-kkfk1-v1.31.4-hkmbk namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca/..2025_03_03_01_15_45.490470259/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_15_45.439326823/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_15_45.1918001777/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_15_45.2369293391/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_15_45.3923805873/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_15_45.3336896937/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/ca.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.crt, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.1112355822/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.1747192981/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_09.4148787187/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_09.386575845/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_45.1500377092/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_10_45.274742397/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.crt, permissions: 640 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-13.pem, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-10-06.pem, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/cba5277c-2ea9-4ff9-aa0f-720ebc55a428/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_16.4128433039/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-g7p4p-v1.31.4-r8rjr namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.3857247242/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.3050428415/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_10.1333348608/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_10.307199430/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca/..2025_03_03_01_16_36.2922815650/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca/..2025_03_03_01_12_36.1174479734/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_36.1728520434/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_12_36.3572642423/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_12_36.2145202368/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_36.282363630/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_12_36.3945965329/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/ca.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.crt, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_09_35.3955725141/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.crt, permissions: 640 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-08-29.pem, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-07-27.pem, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/3653b577-e930-4df8-b0b6-c1dee555c93f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_07_28.1688515968/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-bex82-v1.31.4-nt98w namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_05.913416246/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_05.439102016/bundle.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.crt, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, permissions: 644 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca/..2025_03_03_01_14_29.407171975/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_29.2499436981/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-front-proxy/..2025_03_03_01_14_29.2116021732/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-vpn/..2025_03_03_01_14_29.4102013387/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_29.1069799842/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/ca-etcd/..2025_03_03_01_14_29.3554070821/bundle.crt, permissions: 644 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/ca.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.crt, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca/..2025_03_03_01_10_31.235358473/bundle.crt, permissions: 644 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.crt, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~projected/client-ca/..2025_03_03_01_12_28.1885206071/bundle.crt, permissions: 644 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.crt, permissions: 640 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-ca/..2025_03_03_01_02_06.2507918529/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-ca/..2025_03_03_01_02_06.696245391/bundle.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.crt, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, permissions: 644 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-31.pem, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-40.pem, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot containerName: kube-proxy details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                            <li>cluster: shoot containerName: conntrack-fix details: fileName: /var/lib/kubelet/pods/9618e3a0-8bdf-4e84-ae68-88437c5e8fee/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_09_32.791759420/ca.crt, permissions: 644 kind: pod name: kube-proxy-worker-dqty2-v1.31.4-tpl27 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242467 (Medium) - The Kubernetes PKI keys must have file permissions set to 600 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has expected permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2269653654/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3619666546/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.911620075/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_52.1447808254/bundle.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_52.3118211134/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_52.3201692229/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_52.3153250716/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_52.3609175546/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_52.3930137623/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/8453cbe8-7815-4009-a228-90aa1f22bdd9/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_52.1526321829/tls.key, permissions: 640 kind: pod name: kube-apiserver-7c5459cc5b-kz2dz namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_12_51.3807269484/ca.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_51.4117152144/tls.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/18ff08d4-cfa9-4958-8aca-ee41d678f1d3/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_12_51.1942131254/ca.key, permissions: 640 kind: pod name: kube-controller-manager-c8b755f65-p4v5d namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ba7e893a-c91e-4051-9cc0-aefe8c1fe492/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_13_50.72514188/tls.key, permissions: 640 kind: pod name: kube-scheduler-678cb86cc-zm2cn namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_01.3321577487/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_01.2596588739/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_01.1252005562/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-12.pem, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-55.pem, permissions: 600 kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.2561838193/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.980570931/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.1461912590/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_09.729094142/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_09.2392161902/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_09.2268049037/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_14_45.741295729/ca.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_45.592586788/tls.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/5ce475eb-2980-488b-a80e-b6056cb46e48/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_14_45.264971959/ca.key, permissions: 640 kind: pod name: kube-controller-manager-9b68d9877-7d97p namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/e13bc0c7-ae81-4b12-a8f0-7939662b6273/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_10_45.3845255199/tls.key, permissions: 640 kind: pod name: kube-scheduler-79b6c874b4-q7l8z namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_15_45.731119053/bundle.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_15_45.4210460930/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/server/..2025_03_03_01_15_45.940486963/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_15_45.4026042906/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_15_45.330086599/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_15_45.2219346093/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/56fb368e-1dfa-4d5c-86bc-d3233d8c5ff7/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_15_45.1994303313/tls.key, permissions: 640 kind: pod name: kube-apiserver-78d668b498-8xmjt namespace: shoot--diki-comp--azure </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-13.pem, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-10-06.pem, permissions: 600 kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.1725835043/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2781398980/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.4134020076/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_16_36.3990387563/ca.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/server/..2025_03_03_01_16_36.256775248/tls.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/90f34bcf-ceda-4e65-8112-679308dd007f/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_16_36.2964178139/ca.key, permissions: 640 kind: pod name: kube-controller-manager-d546c97bb-k5rsh namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_12_36.2525007222/bundle.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_12_36.3477424634/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/server/..2025_03_03_01_12_36.2325140443/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_12_36.2748958189/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_12_36.1279523670/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_12_36.278921696/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/608b7ac2-2a64-4600-bffc-9ed14a956ed8/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_12_36.3122740563/tls.key, permissions: 640 kind: pod name: kube-apiserver-857b9bd577-9k45w namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/ecad819a-dc71-4e4e-a17e-11b91bd08505/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_09_35.344821711/tls.key, permissions: 640 kind: pod name: kube-scheduler-65fbc646c-ck6kp namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_10.2704526131/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_10.3265591842/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_10.3223316245/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-08-29.pem, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-07-27.pem, permissions: 600 kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-client/..2025_03_03_01_10_31.3584083571/ca.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/server/..2025_03_03_01_10_31.104263364/tls.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-controller-manager details: fileName: /var/lib/kubelet/pods/c96aace0-5680-4b81-9225-cb3db3aed8bf/volumes/kubernetes.io~secret/ca-kubelet/..2025_03_03_01_10_31.1741570139/ca.key, permissions: 640 kind: pod name: kube-controller-manager-6f87877757-4grgt namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-scheduler details: fileName: /var/lib/kubelet/pods/c079eae7-e4b5-4e7a-adfb-051573ecabea/volumes/kubernetes.io~secret/kube-scheduler-server/..2025_03_03_01_12_28.484866836/tls.key, permissions: 640 kind: pod name: kube-scheduler-68854c4574-mbcz2 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_06.2589642709/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_06.2509886571/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_06.989578068/tls.key, permissions: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-server-tls/..2025_03_03_01_02_05.3893612686/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/backup-restore-server-tls/..2025_03_03_01_02_05.4287174027/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~secret/etcd-client-tls/..2025_03_03_01_02_05.1189205670/tls.key, permissions: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/service-account-key-bundle/..2025_03_03_01_14_29.3490774438/bundle.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kube-aggregator/..2025_03_03_01_14_29.3516547635/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/server/..2025_03_03_01_14_29.1544469879/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/kubelet-client/..2025_03_03_01_14_29.798787007/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/etcd-client/..2025_03_03_01_14_29.3024572020/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/tls-sni-0/..2025_03_03_01_14_29.4247416010/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: seed containerName: kube-apiserver details: fileName: /var/lib/kubelet/pods/adef142b-7c5d-4d1e-b0c2-9c575b9bbdea/volumes/kubernetes.io~secret/http-proxy/..2025_03_03_01_14_29.2845433525/tls.key, permissions: 640 kind: pod name: kube-apiserver-5d6dcc9bd5-jsqrl namespace: shoot--diki-comp--openstack </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-client-2025-03-03-01-09-31.pem, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>cluster: shoot details: fileName: /var/lib/kubelet/pki/kubelet-server-2025-03-03-01-09-40.pem, permissions: 600 kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">245541 (Medium) - Kubernetes Kubelet must not disable timeouts.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option streamingConnectionIdleTimeout set to allowed value.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                            <li>kind: node name: ip-IP-Address.eu-west-1.compute.internal </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-2wxkr </li>
                                                            <li>kind: node name: shoot--diki-comp--azure-worker-g7p4p-z3-7ccb8-8mwhx </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-66str </li>
                                                            <li>kind: node name: shoot--diki-comp--gcp-worker-bex82-z1-d8757-nl4s4 </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-j8jtj </li>
                                                            <li>kind: node name: shoot--diki-comp--openstack-worker-dqty2-z1-6c54d-x7lx7 </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">245542 (High) - Kubernetes API Server must disable basic authentication to protect information in transit.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option basic-auth-file has not been set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">245544 (High) - Kubernetes endpoints must use approved organizational certificate and key pair to protect information in transit.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option kubelet-client-certificate set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option kubelet-client-key set.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">254800 (High) - Kubernetes must have a Pod Security Admission control file configured.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">PodSecurity is properly configured</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: PodSecurityConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: PodSecurityConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: PodSecurityConfiguration </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: PodSecurityConfiguration </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="tw-list-inside tw-pl-2">
                            <li>
                                <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                                        class="arrow right"></i></button>
                                <span class="tw-text-lg">&#128309 Skipped</span>
                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242380 (Medium) - The Kubernetes etcd must use TLS to protect the confidentiality of sensitive data during electronic dissemination.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">ETCD runs as a single instance, peer communication options are not used.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242384 (Medium) - The Kubernetes Scheduler must have secure binding.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">The Kubernetes Scheduler runs in a container which already has limited access to network interfaces. In addition ingress traffic to the Kubernetes Scheduler is restricted via network policies, making an unintended exposure less likely.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242385 (Medium) - The Kubernetes Controller Manager must have secure binding.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">The Kubernetes Controller Manager runs in a container which already has limited access to network interfaces. In addition ingress traffic to the Kubernetes Controller Manager is restricted via network policies, making an unintended exposure less likely.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242396 (Medium) - Kubernetes Kubectl cp command must give expected access and results.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">&#34;kubectl&#34; is not installed into control plane pods or worker nodes and Gardener does not offer Kubernetes v1.12 or older.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242398 (Medium) - Kubernetes DynamicAuditing must not be enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option feature-gates.DynamicAuditing removed in Kubernetes v1.19.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242399 (Medium) - Kubernetes DynamicKubeletConfig must not be enabled.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option featureGates.DynamicKubeletConfig removed in Kubernetes v1.26.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: Used Kubernetes version 1.31.4. </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: Used Kubernetes version 1.31.4. </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: Used Kubernetes version 1.31.4. </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>details: Used Kubernetes version 1.31.4. </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242405 (Medium) - Kubernetes manifests must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener does not deploy any control plane component as systemd processes or static pod.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242408 (Medium) - The Kubernetes manifest files must have least privileges.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener does not deploy any control plane component as systemd processes or static pod.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242410 (Medium) - The Kubernetes API Server must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Cannot be tested and should be enforced organizationally. Gardener uses a minimum of known and automatically opened/used/created ports/protocols/services (PPSM stands for Ports, Protocols, Service Management).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242411 (Medium) - The Kubernetes Scheduler must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Cannot be tested and should be enforced organizationally. Gardener uses a minimum of known and automatically opened/used/created ports/protocols/services (PPSM stands for Ports, Protocols, Service Management).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242412 (Medium) - The Kubernetes Controllers must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Cannot be tested and should be enforced organizationally. Gardener uses a minimum of known and automatically opened/used/created ports/protocols/services (PPSM stands for Ports, Protocols, Service Management).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242413 (Medium) - The Kubernetes etcd must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Cannot be tested and should be enforced organizationally. Gardener uses a minimum of known and automatically opened/used/created ports/protocols/services (PPSM stands for Ports, Protocols, Service Management).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242426 (Medium) - Kubernetes etcd must enable client authentication to secure service.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">ETCD runs as a single instance, peer communication options are not used.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242432 (Medium) - Kubernetes etcd must have peer-cert-file set for secure communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">ETCD runs as a single instance, peer communication options are not used.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242433 (Medium) - Kubernetes etcd must have a peer-key-file set for secure communication.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">ETCD runs as a single instance, peer communication options are not used.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--aws </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--azure </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--gcp </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: statefulSet name: etcd-main namespace: shoot--diki-comp--openstack </li>
                                                            <li>kind: statefulSet name: etcd-events namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242437 (High) - Kubernetes must have a pod security policy set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">PSPs are removed in K8s version 1.25.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242443 (Medium) - Kubernetes must contain the latest updates as authorized by IAVMs, CTOs, DTMs, and STIGs.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Scanning/patching security vulnerabilities should be enforced organizationally. Security vulnerability scanning should be automated and maintainers should be informed automatically.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242444 (Medium) - Kubernetes component manifests must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Rule is duplicate of &#34;242405&#34;</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242454 (Medium) - Kubernetes kubeadm.conf must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener does not use &#34;kubeadm&#34; and also does not store any &#34;main config&#34; anywhere in seed or shoot (flow/component logic built-in/in-code).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242455 (Medium) - Kubernetes kubeadm.conf must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener does not use &#34;kubeadm&#34; and also does not store any &#34;main config&#34; anywhere in seed or shoot (flow/component logic built-in/in-code).</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242456 (Medium) - Kubernetes kubelet config must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Rule is duplicate of &#34;242452&#34;.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242457 (Medium) - Kubernetes kubelet config must be owned by root.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Rule is duplicate of &#34;242453&#34;.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242465 (Medium) - Kubernetes API Server audit log path must be set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Rule is duplicate of &#34;242402&#34;</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">254801 (High) - Kubernetes must enable PodSecurity admission controller on static pods and Kubelets.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Option featureGates.PodSecurity was made GA in v1.25 and removed in v1.28.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="tw-list-inside tw-pl-2">
                            <li>
                                <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                                        class="arrow right"></i></button>
                                <span class="tw-text-lg">&#128309 Accepted</span>
                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242402 (Medium) - The Kubernetes API Server must have an audit log path set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener can integrate with different audit logging solutions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242403 (Medium) - The Kubernetes API Server must generate audit records that identify what type of event has occurred, identify the source of the event, contain the event results, identify any users, and identify any containers associated with the event.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener can integrate with different audit logging solutions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242414 (Medium) - The Kubernetes cluster must use non-privileged host ports for user pods.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">node local dns requires port 53 in order to operate properly</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-7hq55 namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-7hq55 namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-bg64b namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-bg64b namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-t252j namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-t252j namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-v42pz namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-v42pz namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-4hxs6 namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-4hxs6 namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-f7kfv namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-f7kfv namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-28vpp namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-28vpp namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-b4bn9 namespace: kube-system </li>
                                                            <li>cluster: shoot details: containerName: node-cache, port: 53 kind: pod name: node-local-dns-b4bn9 namespace: kube-system </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242462 (Medium) - The Kubernetes API Server must be set to audit log max size.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener can integrate with different audit logging solutions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242463 (Medium) - The Kubernetes API Server must be set to audit log maximum backup.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener can integrate with different audit logging solutions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242464 (Medium) - The Kubernetes API Server audit log retention must be set.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">Gardener can integrate with different audit logging solutions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">245543 (High) - Kubernetes API Server must disable token authentication to protect information in transit.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">All defined tokens are accepted.</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>kind: deployment name: kube-apiserver namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="tw-list-inside tw-pl-2">
                            <li>
                                <button onclick="collapse(event)" class="tw-text-lg tw-pr-2"><i
                                        class="arrow right"></i></button>
                                <span class="tw-text-lg">&#128308 Failed</span>
                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                    <li>
                                        <button onclick="collapse(event)" class="tw-pr-2"><i
                                                class="arrow right"></i></button>
                                        <span class="tw-font-semibold">242459 (Medium) - The Kubernetes etcd must have file permissions set to 644 or more restrictive.</span>
                                        <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                            <li>
                                                <button onclick="collapse(event)" class="tw-pr-2"><i
                                                        class="arrow right"></i></button>
                                                <span class="tw-font-medium">File has too wide permissions</span>
                                                <ul class="tw-list-inside tw-pl-5 tw-hidden">
                                                    <li>
                                                        <span class="tw-font-semibold">aws</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/d46d0708-802d-43a7-bdf8-646912b7cb62/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.1092768610/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/43f307d7-051f-446e-a314-0e435190ca59/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_01.2294882418/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--aws </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">azure</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/153ccd2e-435b-4b34-8337-7b33a279136f/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.3605391883/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/e40a1350-0fce-48ce-bed8-75ba8d51e7a0/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_09.745783697/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--azure </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">gcp</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/9e7e0135-30fe-4ef6-a174-df3a12ff2ca4/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.1269252471/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/4df10450-500f-42ec-bcfd-2416afeb4c18/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_10.2368081495/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--gcp </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span class="tw-font-semibold">openstack</span>
                                                        <ul class="tw-list-disc tw-list-inside tw-pl-5">
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/576670d6-2e92-4999-a5db-46d1e5b110fc/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_06.3524888998/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-main-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: backup-restore details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/ca.crt, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                            <li>containerName: etcd details: fileName: /var/lib/kubelet/pods/7a54bb1c-3f4b-4dc7-95f5-377c788ad051/volumes/kubernetes.io~projected/kube-api-access-gardener/..2025_03_03_01_02_05.3448401570/namespace, permissions: 644, expectedPermissionsMax: 640 kind: pod name: etcd-events-0 namespace: shoot--diki-comp--openstack </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>

</html>
