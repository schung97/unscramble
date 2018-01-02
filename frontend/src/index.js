
document.addEventListener('DOMContentLoaded', function(event) {
  Word.getAll();
  User.getAll();
  Attempt.getAll();

  Event.setup();
});
