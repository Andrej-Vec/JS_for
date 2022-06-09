import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  const fighterImg = createFighterImage(fighter);
  const fighterInfo = createFighterInfo(fighter);

  document.querySelector('.preview-container___root').appendChild(fighterElement);
  
  fighterElement.append(fighterImg);
  fighterElement.append(fighterInfo);
  // todo: show fighter info (image, name, health, etc.)

  return fighterElement;
}


export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });
  
  return imgElement;
}



export function createFighterInfo({ name, health, attack, defense }) {
  const infoElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___info',
  });
  infoElement.innerText = `name: ${name}\nhealth: ${health}\nattack: ${attack}\ndefense: ${defense}` ;
  return infoElement;
}
