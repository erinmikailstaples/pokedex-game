import styles from './Pokedex.module.scss'

export default function Pokedex() {
  return (
    <div className={styles.pokedex}>
      {
         <div id="pokedex">
         <div class="sensor">
           <button></button>
         </div>
         <div class="camera-display">
           <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"/>
         </div>
         <div class="divider"></div>
         <div class="stats-display">
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
         <div class="botom-actions">
           <div id="actions">
             <button class="a"></button>
           </div>
           <div id="cross">
             <button class="cross-button up"></button>
             <button class="cross-button right"></button>
             <button class="cross-button down"></button>
             <button class="cross-button left"></button>
             <div class="cross-button center"> </div>
           </div>
         </div>
         <div class="input-pad"><input /></div>
       
         <div class="bottom-modes">
           
             <button class="level-button"></button>
             <button class="level-button"></button>
             <button class="level-button"></button>
             <button class="level-button"></button>
           
             <button class="pokedex-mode black-button">Pokedex</button>
             <button class="game-mode black-button">Game</button>
           
         </div>
       
       </div>

      }
    </div>
  )
}
