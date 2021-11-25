<script>
    import {onMount, createEventDispatcher} from 'svelte';
    import IconifyIcon from '@iconify/svelte';
    import crosshairsGps from '@iconify-icons/mdi/crosshairs-gps';

    const dispatch = createEventDispatcher();

    let geolocator;
    let searching = false;
    let errMsg =
        "Impossible d'activer la géolocalisation. Vérifiez vos paramètres ou réessayez.";

    const cutSixDigits = (number) => parseFloat(number.toFixed(6));

    const setGeo = (p) => {
        let lat = cutSixDigits(p.coords.latitude);
        let lng = cutSixDigits(p.coords.longitude);
        dispatch('geolocate', {lat, lng});
        console.log(`Dispatch ${lat},${lng}`);
        searching = false;
    };

    const setError = (e) => {
        searching = false;
        alert(errMsg);
        console.error(errMsg);
    };

    const settings = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: Infinity,
    };

    const getPosition = () => {
        if (!navigator || !navigator.geolocation) {
            setError();
        } else {
            searching = true;
            navigator.geolocation.getCurrentPosition(setGeo, setError, settings);
        }
    };

    onMount(() => {
        getPosition();
    });
</script>

<button class="icon"
        class:spin={searching}
        bind:this={geolocator}
        on:click|preventDefault={getPosition}>
    <IconifyIcon icon={crosshairsGps} height="1.25em" width="1.25em"/>
</button>

<style lang="scss">
  .icon {
    background-color: white !important;
    border-radius: 10000px;
    color: black;
    padding: 0.2em;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    color: blue;
    :global(svg) {
      fill: white;
      animation-name: spin;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
</style>