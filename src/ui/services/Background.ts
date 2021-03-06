import { promises } from 'fs';

class Background {

    static instance: Background;
    background: any;
    initPromise: Promise<void>;
    onUpdateCb: Array<(state) => void> = [];
    _defer;
    _assetsPromise;

    constructor() {
        this._defer = {};
        this.initPromise = new Promise((res, rej) => {
            this._defer.resolve = res;
            this._defer.reject = rej;
        });
        this._defer.promise = this.initPromise;
    }

    on(cb: (state) => void) {
        if(this.onUpdateCb.indexOf(cb) > -1) {
            return null;
        }

        this.onUpdateCb.push(cb);
    }

    off(cb) {
        this.onUpdateCb = this.onUpdateCb.filter((cb2) => cb2 !== cb);
    }

    init(background) {
        background.on('update', this._onUpdate.bind(this));
        this.background = background;
        this._defer.resolve();
    }

    async getState() {
        await this.initPromise;
        const data = await this.background.getState();
        this._onUpdate(data);
        return data;
    }

    async setCurrentLocale(lng): Promise<void> {
        await this.initPromise;
        return this.background.setCurrentLocale(lng);
    }

    async setUiState(newUiState) {
        await this.initPromise;
        return this.background.setUiState(newUiState);
    }

    async selectAccount(address): Promise<void> {
        await this.initPromise;
        return this.background.selectAccount(address);
    }

    async addWallet(data): Promise<void> {
        await this.initPromise;
        return this.background.addWallet(data);
    }

    async removeWallet(address): Promise<void> {
        await this.initPromise;
        return this.background.removeWallet(address);
    }

    async lock(): Promise<void> {
        await this.initPromise;
        return this.background.lock();
    }

    async unlock(password): Promise<void> {
        await this.initPromise;
        return this.background.unlock(password);
    }

    async initVault(password): Promise<void> {
        await this.initPromise;
        return this.background.initVault(password);
    }

    async exportAccount(address, password): Promise<void> {
        await this.initPromise;
        return this.background.exportAccount(address, password);
    }

    async editWalletName(address, name) {
        await this.initPromise;
        return this.background.editWalletName(address, name);
    }

    async newPassword(oldPassword, newPassword): Promise<void> {
        await this.initPromise;
        return this.background.newPassword(oldPassword, newPassword);
    }

    async clearMessages(): Promise<void> {
        await this.initPromise;
        return this.background.clearMessages();
    }

    async approve(messageId, address): Promise<any> {
        await this.initPromise;
        return this.background.approve(messageId, address);
    }

    async reject(messageId): Promise<void> {
        await this.initPromise;
        return this.background.reject(messageId);
    }

    async setNetwork(network): Promise<void> {
        await this.initPromise;
        return this.background.setNetwork(network);
    }

    async getNetworks(): Promise<void> {
        await this.initPromise;
        const networks = await this.background.getNetworks();
        this._onUpdate({ networks });
        return networks;
    }

    async setCustomNode(url, network): Promise<void> {
        await this.initPromise;
        return this.background.setCustomNode(url, network);
    }

    async assetInfo(assetId: string): Promise<any> {
        await this.initPromise;
        this._assetsPromise = this._assetsPromise || this.background.assetInfo(assetId);
        const data = await this._assetsPromise;
        this._assetsPromise = null;
        return data;
    }

    async getUserList(type: string, from: number, to: number): Promise<any> {
        await this.initPromise;
        return this.background.getUserList(type, from, to);
    }

    _onUpdate(state: IState) {
        for (const cb of this.onUpdateCb) {
            cb(state);
        }
    }
}

export default new Background();

export interface IState {
    locked?: boolean;
    hasAccount?: boolean;
    currentLocale?: string;
    accounts?: Array<any>;
    currentNetwork?: string;
    messages?: Array<any>;
    balances?: any;
    uiState?: IUiState;
    networks?: Array<{ name; code; }>;
}

export interface IUiState {
    tab: string;
}
