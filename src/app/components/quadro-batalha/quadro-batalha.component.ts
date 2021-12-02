import { Component, OnInit } from '@angular/core';
import { EmbarcacaoPosicionada, Posicao } from 'src/app/models/embarcacao-posicionada';
import { EmbarcacaoTipo } from 'src/app/models/embarcacao-tipo';
import { PeerService } from 'src/app/services/peer.service';
declare var Peer: any;

@Component({
  selector: 'app-quadro-batalha',
  templateUrl: './quadro-batalha.component.html',
  styleUrls: ['./quadro-batalha.component.scss']
})
export class QuadroBatalhaComponent implements OnInit {
  colunas: number[] = Array(15).fill(1).map((x, i) => i + 1);
  linhas: number[] = Array(15).fill(1).map((x, i) => i + 1);
  embarcacoesPosicionadas: EmbarcacaoPosicionada[] = [];
  posicoesInimigasSelecionada: Posicao[] = [{posX: 1, posY: 15}];
  embarcacoes: EmbarcacaoTipo[] = [];
  selectedEmbarcao!: EmbarcacaoTipo;

  constructor(private peerService: PeerService) {
    this.embarcacoes = [
      {
        nome: 'Porta-aviões',
        tamanho: [
          {posX: 0, posY: 0},
          {posX: 1, posY: 0},
          {posX: 2, posY: 0},
          {posX: 3, posY: 0},
          {posX: 4, posY: 0},
        ],
        qtd: 1
      },
      {
        nome: 'Encouraçado',
        tamanho: [
          {posX: 0, posY: 0},
          {posX: 1, posY: 0},
          {posX: 2, posY: 0},
          {posX: 3, posY: 0},
        ],
        qtd: 2
      },
      {
        nome: 'Hidroavião',
        tamanho: [
          {posX: 0, posY: 0},
          {posX: 1, posY: -1},
          {posX: 2, posY: 0},
        ],
        qtd: 3
      },
      {
        nome: 'Submarino',
        tamanho: [
          {posX: 0, posY: 0},
        ],
        qtd: 4
      },
      {
        nome: 'Cruzadores',
        tamanho: [
          {posX: 0, posY: 0},
          {posX: 1, posY: 0},
        ],
        qtd: 3
      },
    ]

    this.selectedEmbarcao = this.embarcacoes[0];
  }

  async ngOnInit(): Promise<void> {

    const peer = await this.peerService.create();
    console.log('My peer ID is: ' + peer.id);

    const peer2 = await this.peerService.create();
    console.log('My peer ID 2 is: ' + peer2.id);

    peer2.on('connection', (conn: any) => {
      conn.on('data', (data: any) => {
        console.log('Received 2', data);
      });
    });

    const conn1 = peer.connect(peer2.id);

    conn1.on('open', function() {
      // Receive messages
      conn1.on('data', function(data: any) {
        console.log('Received 1', data);
      });

      // Send messages
      conn1.send('Hello!');
    });






  }

  addEmbarcacao(emb: EmbarcacaoTipo, x: number, y: number) {
    const embarcacaoIndex = this.embarcacoes.findIndex(embarcacao => embarcacao.nome == emb.nome);
    if(this.embarcacoes[embarcacaoIndex].qtd <= 0) {
      return;
    }
    let embPos = new EmbarcacaoPosicionada();
    let foradoslimites = false;
    embPos.pos = [];
    for (const tamanho of emb.tamanho) {
      if(((x + tamanho.posX) < 1 || (x + tamanho.posX) > 15) || ((y + tamanho.posY) < 1 || (y + tamanho.posY) > 15)  || this.temEmbarcacao((x + tamanho.posX), (y + tamanho.posY)) ) {
        foradoslimites = true;
      }
      embPos.pos.push({
        posX: x + tamanho.posX,
        posY: y + tamanho.posY
      });

    }

    console.log('embPos')
    console.log(embPos)
    console.log('embarcacoesPosicionadas')
    console.log(this.embarcacoesPosicionadas)
    if(!foradoslimites) {
      --this.embarcacoes[embarcacaoIndex].qtd;
      this.embarcacoesPosicionadas.push(embPos);
    }
  }

  temEmbarcacao(x: number, y: number) {
    let temEmbarcacao: boolean = false;
    for (const emb of this.embarcacoesPosicionadas) {
      for (const pos of emb.pos) {
        if(pos.posX === x && pos.posY === y) {
          temEmbarcacao = true;
        }
      }
    }

    return temEmbarcacao;
  }

  temPosicaoInimiga(x: number, y: number) {
    let temPosicao: boolean = false;
    for (const pos of this.posicoesInimigasSelecionada) {
      if(pos.posX === x && pos.posY === y) {
        temPosicao = true;
      }
    }

    return temPosicao;
  }

  changeEmbarcacao(nome: string) {
    this.selectedEmbarcao = this.embarcacoes.filter(emb => emb.nome === nome)[0];
  }

  generateUID() {
    // I generate the UID from two parts here
    // to ensure the random number provide enough bits.
    let firstPart: any = (Math.random() * 46656) | 0;
    let secondPart: any = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  }

}
