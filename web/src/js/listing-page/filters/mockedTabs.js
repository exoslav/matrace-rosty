const mockedTabs = $(`
  <div class="ui-tabs-component">
    <ul>
      <li><a href="#tabs-1">Šíka</a></li>
      <li><a href="#tabs-2">Materiál</a></li>
      <li><a href="#tabs-3">Délka</a></li>
    </ul>
    
    <div id="tabs-1">
      <li class="filters__category filters__category--1">
        <button class="filters__close-category" type="button">
          <i class="icon icon-cancel"></i>
        </button>

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
    </div>
    
    <div id="tabs-2">
      <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
    </div>
    
    <div id="tabs-3">
      <p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
      <p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
    </div>
  </div>
`);

export default mockedTabs;
