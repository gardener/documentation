# SPDX-FileCopyrightText: 2025 SAP SE or an SAP affiliate company and Gardener contributors
#
# SPDX-License-Identifier: Apache-2.0

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class GardenerPublic(unittest.TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=options)

    def test_edit_this_page(self):
        driver = self.driver
        driver.get("http://localhost:1313/docs/getting-started/introduction/")
        self.assertIn("Gardener", driver.title)
        link_element = driver.find_element(By.LINK_TEXT,"Edit this page")
        link_url = link_element.get_attribute("href")
        expected_url = "https://github.com/gardener/documentation/edit/master/website/documentation/getting-started/introduction.md"
        self.assertEqual(link_url, expected_url, f"Link URL is incorrect: {link_url}")

    def test_anchors(self):
        driver = self.driver
        driver.get("http://localhost:1313/docs/guides/client-tools/bash-tips/")
        anchors = WebDriverWait(driver, 5).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME,"td-heading-self-link"))
        )
        self.assertGreaterEqual(len(anchors),2)
        anchor_hrefs = [elem.get_attribute("href") for elem in anchors]
        expected_anchor_hrefs = ["http://localhost:1313/docs/guides/client-tools/bash-tips/#speed-up-your-terminal-workflow",
                                 "http://localhost:1313/docs/guides/client-tools/bash-tips/#populating-the-profile-file"]
        self.assertEqual(anchor_hrefs, expected_anchor_hrefs, f"Anchors are incorrect: {anchor_hrefs}")

    def test_page_toc(self):
        driver = self.driver
        driver.get("http://localhost:1313/docs/guides/networking/certificate-extension/")
        anchor_hrefs = [elem.get_attribute("href") for elem in driver.find_elements(By.CLASS_NAME,"td-heading-self-link")]
        anchor_hrefs.remove("http://localhost:1313/docs/guides/networking/certificate-extension/#manage-certificates-with-gardener-for-public-domain")
        toc = driver.find_element(By.ID,"TableOfContents")
        toc_hrefs = [elem.get_attribute("href") for elem in toc.find_elements(By.CSS_SELECTOR, "a")]
        self.assertEqual(anchor_hrefs,toc_hrefs, f"Page Content to the side doesn't match the sections on the page")

    def test_persona_user(self):
        topics = self.get_personas_gardener_section(1)
        expected_topics = ['Advanced', 'Autoscaling', 'High Availability', 'Networking', 'Observability',
                            'Project', 'Security', 'Shoot', 'Shoot Operations', 'Gardener Info Configmap']
        self.assertListEqual(expected_topics, topics, f"Topics aren't filtered correctly for user persona")

    def test_persona_operator(self):
        topics = self.get_personas_gardener_section(2)
        expected_topics = ['Concepts', 'Deployment', 'Monitoring', 'Configuration', 'Control Plane Migration', 'Istio',
                            'Kube Apiserver Loadbalancing', 'Managed Seed', 'Network Policies', 'Seed Bootstrapping',
                            'Seed Settings', 'Topology Aware Routing', 'Trusted Tls For Control Planes', 'Trusted Tls For Garden Runtime']
        self.assertListEqual(expected_topics, topics, f"Topics aren't filtered correctly for user persona")

    def test_persona_developer(self):
        topics = self.get_personas_gardener_section(3)
        expected_topics = ['API Reference', 'Extensions', 'Autoscaling Specifics for Components', 'Changing the API',
                            'Component Checklist', 'Defaulting', 'Dependencies', 'Getting Started Locally',
                            'High Availability Of Components', 'Ipv6', 'Kubernetes Clients', 'Local Setup',
                            'Log Parsers', 'Logging', 'Monitoring Stack', 'New Cloud Provider', 'New Kubernetes Version',
                            'Priority Classes', 'Process', 'Reversed VPN Tunnel', 'Secrets Management', 'Testing', 'Testmachinery Tests']
        self.assertListEqual(expected_topics, topics, f"Topics aren't filtered correctly for user persona")

    def get_personas_gardener_section(self, index):
        driver = self.driver
        driver.get("http://localhost:1313/")
        dropdown = driver.find_element(By.CSS_SELECTOR, "a.dropdown-toggle")
        actions = ActionChains(driver)
        actions.move_to_element(dropdown).perform()
        selector = f'.dropdown-content > a:nth-of-type({index})'
        option = driver.find_element(By.CSS_SELECTOR, selector)
        option.click()

        gardener_section = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "m-docsgardener-li"))
        )
        gardener_checkbox = gardener_section.find_element(By.ID,"m-docsgardener-check")
        driver.execute_script("arguments[0].checked = true;", gardener_checkbox)
        assert gardener_checkbox.is_selected(), "Gardener section is not selected."

        topics_shown = gardener_section.find_elements(By.CSS_SELECTOR,"ul > li:not([style*='display: none'])")
        topics = [elem.text for elem in topics_shown if elem.text != '']
        return topics
    
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()