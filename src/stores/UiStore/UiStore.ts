import { observable } from 'mobx';

/**
 * A store for the common UI elements
 */
export class UiStore {
  @observable openSidebar: boolean = false;
  @observable notifications: string[] = [];

  constructor() {
    console.log('UiStore Created');
  }
}
