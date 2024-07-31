import styles from '../PokemonDisplay.module.scss'
import Image from 'next/image'
import { useState } from 'react'

export default function Pokedex() {
  const [pokemonId, setPokemonId] = useState(4) // Starting with Charmander (ID: 4)

  const goToNextPokemon = () => {
    setPokemonId(prevId => prevId + 1)
  }

  return (
    <div className={styles.pokedex}>
      <div id="pokedex">
        <div className="sensor" onClick={goToNextPokemon}></div>
        <div className="camera-display">
          <Image 
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId.toString().padStart(3, '0')}.png`}
            alt={`Pokemon ${pokemonId}`}
            width={300}
            height={300}
          />
        </div>
        <div className="divider"></div>
        <div className="stats-display">
          <h2>Pokemon #{pokemonId}</h2>
          <h3>Abilities</h3>
          <ul>
            <li>Ability 1</li>
            <li>Ability 2</li>
          </ul>
          <h3>Moves</h3>
          <ul>
            <li>Move 1</li>
            <li>Move 2</li>
            <li>Move 3</li>
          </ul>
        </div>
        <div className="botom-actions">
          <div id="actions">
            <button type="button" className="a" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
          </div>
          <div id="cross">
            <button type="button" className="cross-button up" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
            <button type="button" className="cross-button right" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
            <button type="button" className="cross-button down" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
            <button type="button" className="cross-button left" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
            <div className="cross-button center"></div>
          </div>
        </div>
        <div className="input-pad"><input onClick={goToNextPokemon} readOnly aria-label="Next Pokemon" /></div>
        <div className="bottom-modes">
          <button type="button" className="level-button" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
          <button type="button" className="level-button" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
          <button type="button" className="level-button" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
          <button type="button" className="level-button" onClick={goToNextPokemon} aria-label="Next Pokemon"></button>
          <button type="button" className="pokedex-mode black-button" onClick={goToNextPokemon}>Pokedex</button>
          <button type="button" className="game-mode black-button" onClick={goToNextPokemon}>Game</button>
        </div>
      </div>
    </div>
  )
}
