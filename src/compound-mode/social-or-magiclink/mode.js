import Mode from '../../lock/mode';
import AskSocialNetworkOrEmail from '../../cred/or/ask_social_network_or_email';
import { initSocial } from '../../social/index';
import dict from './dict';
import * as l from '../../lock/index';

export default class SocialOrMagiclinkMode extends Mode {

  constructor() {
    super("socialOrMagiclink", dict);
  }

  didInitialize(model, options) {
    model = model.set("forceRedirect", !options.popup);
    model = initSocial(model, options);
    this.setModel(model);
  }

  didReceiveClientSettings(m) {
    // TODO: refactor
    if (l.getEnabledConnections(m, "social").count() === 0) {
      throw new Error("At least one social connection needs to be specified");
    }
  }

  render() {
    return new AskSocialNetworkOrEmail();
  }

}