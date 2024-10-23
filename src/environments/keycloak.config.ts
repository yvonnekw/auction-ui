import {KeycloakConfig} from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  url: "http://localhost:9098",
  realm: "oauth2-auction-realm",
  clientId: "auth2-auction-client"
}

export default keycloakConfig;
