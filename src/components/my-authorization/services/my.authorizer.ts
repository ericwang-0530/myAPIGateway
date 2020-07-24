// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,

  Authorizer
} from '@loopback/authorization';
import {BindingKey, Provider} from '@loopback/core';
const debug = require('debug')('loopback:example:acl');
const DEFAULT_SCOPE = 'execute';
const RESOURCE_ID = BindingKey.create<string>('resourceId');

// Class level authorizer
export class MyAuthorizationProvider implements Provider<Authorizer> {
  constructor() {}

  /**
   * @returns authenticateFn
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ): Promise<AuthorizationDecision> {
    const userId = authorizationCtx.principals[0].id;
    const resourceId = await authorizationCtx.invocationContext.get(
      RESOURCE_ID,
      {optional: true},
    );
    const object = resourceId ?? metadata.resource ?? authorizationCtx.resource;

    const allowedRoles = metadata.allowedRoles;

    if (!allowedRoles) return AuthorizationDecision.ALLOW;
    if (allowedRoles.length < 1) return AuthorizationDecision.DENY;

    let allow = false;

    // An optimization for ONLY searching among the allowed roles' policies
    // put some code to see if it is valid to get the api
    for (const role of allowedRoles) {
      //test data
      const userMap = [
        {
          id: 1,
          username: 'John',
          email: 'john@doe.com',
          roleName: 'admin',
        },
        {
          id: 2,
          username: 'Jane',
          email: 'jane@doe.com',
          roleName: 'owner',
        },
        {
          id: 3,
          username: 'Bob',
          email: 'bob@projects.com',
          roleName: 'owner',
        },
        {
          id: 4,
          username: 'Eric',
          email: 'eric@126.com',
          roleName: 'team',
        }
      ]

      userMap.forEach(item => {
        if (item.id == userId) {
          allow = (item.roleName == role);
        }
      })

    }
    console.log('allow:' + allow)
    debug('final result: ', allow);

    if (allow) return AuthorizationDecision.ALLOW;
    else if (allow === false) return AuthorizationDecision.DENY;
    return AuthorizationDecision.ABSTAIN;
  }
}
