export function randomName() {
  const names = [
    "Scubirumpapa",
    "Freasara",
    "Phiethryth",
    "Cynroc",
    "Layles",
    "Ferthcla",
    "Homem fosgo",
    "Meri",
    "Cuduairo",
    "Naculudu",
    "Nós Somos Inguais",
  ];

  const randomNumber = Math.floor(Math.random() * (10 - 0)) + 0;

  return names[randomNumber];
}