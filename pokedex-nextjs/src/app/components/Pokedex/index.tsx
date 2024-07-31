import styles from '../PokemonDisplay.module.scss'
import Image from 'next/image'

export default function Pokedex() {
  return (
    <div className={styles.pokedex}>
      <div id="pokedex">
        <div onClick={() => {console.log("clicked")
        }} className="sensor">
        </div>
        <div className="camera-display">
          <Image 
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
            alt="Charmander"
            width={300}
            height={300}
          />
        </div>
        <div className="divider"></div>
        <div className="stats-display">
          <h2>Charmander</h2>
          <h3>Abilities</h3>
          <ul>
            <li>Solar-power</li>
            <li>Blaze</li>
          </ul>
          <h3>Moves</h3>
          <ul>
            <li>dragon-rage</li>
            <li>dragon-breath</li>
            <li>dragon-claw</li>
          </ul>
        </div>
        <div className="botom-actions">
          <div id="actions">
            <button className="a"></button>
          </div>
          <div id="cross">
            <button className="cross-button up"></button>
            <button className="cross-button right"></button>
            <button className="cross-button down"></button>
            <button className="cross-button left"></button>
            <div className="cross-button center"> </div>
          </div>
        </div>
        <div className="input-pad"><input /></div>
        <div className="bottom-modes">
          <button className="level-button"></button>
          <button className="level-button"></button>
          <button className="level-button"></button>
          <button className="level-button"></button>
          <button className="pokedex-mode black-button">Pokedex</button>
          <button className="game-mode black-button">Game</button>
        </div>
      </div>
    </div>
  )
}
