import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource'
import { helloWorld } from './function/hello-world/resource'

defineBackend({
  auth,
  helloWorld,
});
