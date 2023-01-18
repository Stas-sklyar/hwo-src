export class CryptoHelpers {
    private buf2hex(buffer: ArrayBuffer) {
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }

    public async hash256(txt: string) {
        let enc = new TextEncoder();
        let txtBuff = enc.encode(txt);
        let result = await crypto.subtle.digest('SHA-256', txtBuff);
        let hashtxt = this.buf2hex(result);
        return hashtxt;
    }
}