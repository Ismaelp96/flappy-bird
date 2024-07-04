"use client"
import Cano from "./Cano"

export interface CanoProps {
    superior: number
    inferior: number
    largura: number
    posicao: number
}

export default function Canos(props: CanoProps) {
    return (
        <div
            style={{ width: `${props.largura * 100}%`, left: `${props.posicao * 100}%` }}
            className="absolute flex flex-col justify-between h-full"
        >
            <Cano cima tamanho={props.superior} />
            <Cano tamanho={props.inferior} />
        </div>
    )
}
