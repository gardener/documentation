services:
  hugo-website:
    image: testing-website-image
    environment:
      HUGO_FLAGS: "--bind=0.0.0.0"
      DOCFORGE_CONFIG: /run/secrets/docforge_config
      # Add all of the env var tokens here
      GITHUB_OAUTH_TOKEN: ${GITHUB_OAUTH_TOKEN}
    ports:
    - 1313:1313
    secrets:
    - docforge_config
secrets:
  docforge_config:
    file: ./docforge_config.yaml