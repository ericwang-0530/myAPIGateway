// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {AuthorizationTags} from '@loopback/authorization';
import {Binding, Component} from '@loopback/core';
import {MyAuthorizationProvider} from './services';

export class MyAuthorizationComponent implements Component {
  bindings: Binding[] = [
    Binding.bind('authorizationProviders.my-provider')
      .toProvider(MyAuthorizationProvider)
      .tag(AuthorizationTags.AUTHORIZER),
  ];
}
