window.addEventListener('load', () => {
  const jokeElement = document.querySelector('.joke');
  const tellJokeElement = document.querySelector('.get-joke');
  const setupElement = document.querySelector('.setup');
  const deliveryElement = document.querySelector('.delivery');
  const loadingElement = document.querySelector('.loading');
  const joke = async () => {
    const jokeData = await fetchJoke();

    if ('joke' in jokeData) {
      jokeElement.innerHTML = jokeData.joke;
    } else {
      jokeElement.innerHTML = '';
      setupElement.innerHTML = jokeData.setup;
      setTimeout(() => {
        deliveryElement.innerHTML = jokeData.delivery;
      }, 5000);
    }

    loadingElement.innerHTML = '';
    tellJokeElement.disabled = false;
  };

  const fetchJoke = async () => {
    loading();
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    console.log({ response });
    const jokeData = await response.json();
    return jokeData;
  };

  const loading = () => {
    loadingElement.innerHTML = 'loading...';
    jokeElement.innerHTML = '';
    setupElement.innerHTML = '';
    deliveryElement.innerHTML = '';
    tellJokeElement.disabled = true;
  };

  tellJokeElement.onclick = () => {
    joke();
  };

  joke();
});
