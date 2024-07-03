import ObjetoValor from "../shared/ObejtoValor"
import { EspacoObstaculos } from "./EspacoObstaculos"
import { Nivel } from "./Nivel"
import Obstaculo from "./Obstaculo"

export interface CicloObstaculosProps {
    nivel?: Nivel
    espaco?: EspacoObstaculos
    itens?: CicloObstaculosProps[]
}

export default class CicloObstaculos extends ObjetoValor<CicloObstaculos> {
    readonly nivel: Nivel
    readonly espaco: EspacoObstaculos
    readonly itens: Obstaculo[]

    private constructor(props: CicloObstaculosProps) {
        super(props)
        this.nivel = props.nivel!
        this.espaco = props.espaco!
        this.itens = props.itens!.map((i) => Obstaculo.novo(i))
    }

    static novo(props?: CicloObstaculosProps) {
        const nivel = props?.nivel ?? Nivel.MEDIO
        const espaco = props?.espaco ?? EspacoObstaculos.NORMAL
        const itensNovos = [
            Obstaculo.novo({ nivel, posicao: 1 }),
            Obstaculo.novo({ nivel, posicao: 1 + espaco }),
            Obstaculo.novo({ nivel, posicao: 1 + espaco * 2 }),
            Obstaculo.novo({ nivel, posicao: 1 + espaco * 3 }),
            Obstaculo.novo({ nivel, posicao: 1 + espaco * 4 }),
        ].map((i) => i.props)
        return new CicloObstaculos({
            nivel,
            espaco,
            itens: props?.itens ?? itensNovos,
        })
    }

    animar(): CicloObstaculos {
        const novosItens = this.itens.map((item) => item.animar())
        const maiorPosicao = Math.max(...novosItens.map((item) => item.posicao.valor))
        const menorPosicao = Math.min(...novosItens.map((item) => item.posicao.valor))
        const itens = novosItens.map((item) => {
            const estaMenorPosicao = item.posicao.valor === menorPosicao
            const estaForaDaTela = menorPosicao < -item.largura.valor
            return estaMenorPosicao && estaForaDaTela
                ? Obstaculo.novo({
                      nivel: this.nivel,
                      posicao: maiorPosicao + this.espaco,
                  })
                : item
        })

        return this.clone({ itens: itens.map((i) => i.props) })
    }
}
