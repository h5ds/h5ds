/**
 * @desc loading 模板
 */
export const loadArr = [
  '<div class="timer"></div>',
  '<div class="typing_loader"></div>',
  '<div class="location_indicator"></div>',
  '<div class="dashboard"></div>',
  '<div class="battery"></div>',
  '<div class="magnifier"></div>',
  '<div class="help"></div>',
  '<div class="cloud"></div>',
  '<div class="eye"></div>',
  '<div class="coffee_cup"></div>',
  '<div class="square"></div>',
  '<div class="circle"></div>'
];

// loading 
export function loadHTML(self) {
  let loadIndex = self.app.loading;
  return `
    <div class="loaders">
        ${
        loadArr.map( (elem, index ) => {
            return `<div class="loader ${index == loadIndex ? 'active' : ''}">
                ${elem}     
            </div>`;
        }).join('')
        }
    </div>
    `;
}
