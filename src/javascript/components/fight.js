import {
  controls
} from '../../constants/controls';
import {
  showWinnerModal
} from './modal/winner';


/* Гравці наносять удари один одному за допомогою клавіш A (перший боєць) та J (другий боєць). Бійці можуть блокувати удари 
за допомогою клавіш D та L відповідно, у такому випадку боєць ухиляється від удару. Також боєць не може завдати удар, якщо він знаходиться у блоці. */

/* Показник здоров'я бійця зменшується на кількість шкоди, завданої противником. Її можна буде визначити за допомогою функції getDamage,
 яка повертатиме getHitPower - getBlockPower (або ж 0, якщо боєць "ухилився" від удару повністю, тобто сила блоку більша за силу удару). */
export async function fight(firstFighter, secondFighter) {
  const bars = document.querySelectorAll('.arena___health-bar');
  const healthLeft = firstFighter.health;
  const healthRigt = secondFighter.health;
  return new Promise((resolve) => {

    document.addEventListener('keydown', (e) => {

      if (controls.PlayerOneAttack == e.code) {
        

        secondFighter.health -= getDamage(firstFighter, secondFighter);
        bars[1].style.width = `${secondFighter.health/healthRigt * 100}%`;
        

        if (secondFighter.health <= 0) {
          bars[1].style.width = '0%';
          resolve(showWinnerModal(firstFighter))
        }
      }

      if (controls.PlayerTwoAttack == e.code) {
      

        firstFighter.health -= getDamage(secondFighter, firstFighter);
        bars[0].style.width = `${firstFighter.health/healthLeft * 100}%`;
        

        if (firstFighter.health <= 0) {
          bars[0].style.width = '0%';
          resolve(showWinnerModal(secondFighter))
        }
      }


      if (controls.PlayerOneBlock == e.code) {
        console.log('click D');
      }
      if (controls.PlayerTwoBlock == e.code) {
        console.log('click L');
      }
      
    })

    let pressed = new Set();
    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of controls.PlayerOneCriticalHitCombination) { // все ли клавиши из набора нажаты?
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

     
      secondFighter.health -= 2 * firstFighter.attack;
      bars[1].style.width = `${secondFighter.health/healthRigt * 100}%`;

      if (secondFighter.health <= 0) {
        bars[1].style.width = '0%';
        resolve(showWinnerModal(secondFighter))
      }

      document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
      });

    })


    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of controls.PlayerTwoCriticalHitCombination) { // все ли клавиши из набора нажаты?
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

    
      firstFighter.health -= 2 * secondFighter.attack;
      bars[0].style.width = `${firstFighter.health/healthLeft * 100}%`;

      if (firstFighter.health <= 0) {
        bars[0].style.width = '0%';
        resolve(showWinnerModal(secondFighter))
      }

      document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
      });

    })

  });
}

export function getDamage(attacker, defender) {
  return attacker.attack;
  /*   const result = getHitPower(attacker) - getBlockPower(defender);
    if(result < 0) {
      return 0;
    } else {
      return result;
    } */


}

export function getHitPower(fighter) {
  
  return fighter.attack * Math.floor(Math.random() * 2 + 1);
  
  //return hit power
}

export function getBlockPower(fighter) {
  return fighter.defense * Math.floor(Math.random() * 2 + 1);
  // return block power
}