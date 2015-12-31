var ready = function () {
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').tooltip()
}

$(document).ready(ready);
$(document).on('page:load', ready);
