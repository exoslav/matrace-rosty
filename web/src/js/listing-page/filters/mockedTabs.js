const mockedTabs = $(`
  <div class="filters__category-filters ui-tabs-component">
    <ul>
      <li><a href="#tabs-1" class="ui-tabs-component__title ui-tabs-component__title--size-s">Šířka</a></li>
      <li><a href="#tabs-2" class="ui-tabs-component__title ui-tabs-component__title--size-s">Materiál</a></li>
    </ul>
    
    <div id="tabs-1">
      <ul>
        <li class="filters__category">
          <ul>
            <li class="filters__category__item">
              <div class="checkbox">
                <div class="checkbox__decoy">
                  <input class="checkbox__element" type="checkbox" name="filter-values[1]" id="filter-value-1" data-label="180 cm" data-filter-value="1">
                  <span class="checkbox__icon"></span>
                </div>
              </div>
              <label class="checkbox__label" for="filter-value-1">180 cm</label>
            </li>
            <li class="filters__category__item">
              <div class="checkbox">
                <div class="checkbox__decoy">
                  <input class="checkbox__element" type="checkbox" name="filter-values[2]" id="filter-value-2" data-label="190 cm" data-filter-value="2">
                  <span class="checkbox__icon"></span>
                </div>
              </div>
              <label class="checkbox__label" for="filter-value-2">190 cm</label>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div id="tabs-2">
      <ul>
        <li class="filters__category">
          <ul>
            <li class="filters__category__item">
              <div class="checkbox">
                <div class="checkbox__decoy">
                  <input class="checkbox__element" type="checkbox" name="filter-values[1]" id="filter-value-3" data-label="Smrk" data-filter-value="3">
                  <span class="checkbox__icon"></span>
                </div>
              </div>
              <label class="checkbox__label" for="filter-value-3">Smrk</label>
            </li>
            <li class="filters__category__item">
              <div class="checkbox">
                <div class="checkbox__decoy">
                  <input class="checkbox__element" type="checkbox" name="filter-values[2]" id="filter-value-4" data-label="Dub" data-filter-value="4">
                  <span class="checkbox__icon"></span>
                </div>
              </div>
              <label class="checkbox__label" for="filter-value-4">Dub</label>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
`);

export default mockedTabs;
