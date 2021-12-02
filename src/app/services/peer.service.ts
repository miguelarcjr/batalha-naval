import { Injectable } from '@angular/core';
declare var Peer: any;

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  constructor() { }

  async create(): Promise<any> {
    return new Promise(resolve => {
      const peer = new Peer();
      peer.on('open', function(id: string) {
        resolve(peer);
      });
    });
  }
}
