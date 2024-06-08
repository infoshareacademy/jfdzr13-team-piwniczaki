import styles from "./aboutUs.module.scss";

const AboutUs = () => {
  return (
    <main className={styles.aboutUsWrapper}>
      <h1>O nas</h1>
      <p>
        Witamy na naszej stronie, stworzonej z myślą o wszystkich miłośnikach
        zwierząt! Jesteśmy zespołem pasjonatów, którzy rozumieją, jak ważna jest
        troska o naszych futrzastych przyjaciół. Nasz cel to łączyć tych, którzy
        potrzebują pomocy w opiece nad swoimi zwierzakami, z tymi, którzy z
        radością tę pomoc oferują. Serdecznie zapraszamy do korzystania z naszej
        platfprmy i dzielenia się swoimi doświadczeniami!
      </p>
      <ul className={styles.aboutUsList}>
        <li>
          <h1>Nasza misja</h1>
          <p>
            Naszą misją jest tworzenie bezpiecznej, przyjaznej i zaufanej
            przestrzeni, w której właściciele zwierząt i opiekunowie mogą się
            spotykać, by dzielić się pasją do zwierząt oraz wspierać się
            nawzajem. Wierzymy, że każdy zwierzak zasługuje na troskliwą opiekę,
            a każdy właściciel na spokój ducha, wiedząc, że jego pupil jest w
            dobrych rękach.
          </p>
        </li>
        <li>
          <h1>Nasza wizja</h1>
          <p>
            Wyobrażamy sobie świat, w którym każdy zwierzak, niezależnie od
            gatunku czy wielkości, jest otoczony miłością i troską, na jaką
            zasługuje. Nasza wizja to przyszłość, w której opieka nad
            zwierzętami jest dostępna, łatwa i bezpieczna dla wszystkich
            właścicieli. Z pasją i zaangażowaniem pracujemy nad tym, aby nasza
            platforma była miejscem, gdzie każde zwierzę i każdy właściciel
            znajdą to, czego potrzebują.
          </p>
        </li>
      </ul>
    </main>
  );
};

export default AboutUs;
