<script>
    import Geolocate from "../components/Geolocate.svelte";
    import ods from "../utilities/ods";

    let errorMsg;
    let userCoords;
    let records = [];
    let prixMoyenAlaSurface = 0;

    $: if (userCoords && userCoords.lat) refreshData(userCoords);

    const refreshData = (coords) => {
        let res = ods.getAround('public', 'demande-de-valeurs-foncieres-agrege-a-la-transaction', coords);
        res.then(data => {
            records = data.records;

            let nbSurface = 0;
            let sumSurface = 0;
            let sumPrix = 0;
            for (let i = 0; i < records.length; i += 1) {
                let record = records[i];
                let surface = (record.fields.surface_reelle_bati || record.fields.surface_carrez_du_1er_lot || record.fields.surface_carrez_du_2eme_lot || record.fields.surface_carrez_du_3eme_lot || record.fields.surface_carrez_du_4eme_lot);
                if (!surface)
                    continue;
                sumSurface += surface;
                nbSurface += 1;
                sumPrix += record.fields.valeur_fonciere || 0;
            }
            prixMoyenAlaSurface = (nbSurface > 0 ? sumPrix / sumSurface : 0)
        });
    }

    const geolocate = (event) => {
        userCoords = event.detail;
    }
</script>

{#if errorMsg}
    {errorMsg}
{/if}

<div class="main">
    <div class="head">
        <h3>ShowMeAround</h3>
        <h4>Demande de valeurs foncières</h4>
        <div class="geolocate">
            <Geolocate on:geolocate={geolocate}/>
        </div>
    </div>
    <div class="content">
        <ul>
            {#if records}
                {#each records as record}
                    <li>
                        <div class="ligne">
                            <a target="_blank" href="https://www.google.com/maps/search/{`${record.fields.adresse},${record.fields.commune},${record.fields.nom_dep}`}">{record.fields.adresse}</a>
                            <div>{(record.fields.valeur_fonciere||0).toLocaleString(undefined,{'maximumFractionDigits':0})} €</div>
                        </div>
                        <div class="ligne">
                            <div>{new Date(record.fields.date_mutation).toDateString()}</div>
                            <div>{record.fields.surface_reelle_bati || record.fields.surface_carrez_du_1er_lot || record.fields.surface_carrez_du_2eme_lot || record.fields.surface_carrez_du_3eme_lot || record.fields.surface_carrez_du_4eme_lot || '?'} m<sup>2</sup>
                            </div>
                        </div>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
    <div class="footer">
        <div>Prix moyen autour de vous</div>
        <div class="val">{prixMoyenAlaSurface.toLocaleString(undefined,{'maximumFractionDigits':0})} €/m<sup>2</sup></div>
    </div>
</div>

<style lang="scss">
  .main {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .head {
    height: 75px;
    padding: 0.3em;
    text-align: center;

    h3 {
      font-size: 1.5em;
      font-weight: bold;
    }

    .geolocate {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .content {
    height: calc(100% - 75px - 60px);
    overflow: auto;
  }

  .footer {
    height: 60px;
    font-size: 1.1em;
    @apply flex p-4 font-light;
    align-items: center;
    gap: 10px;

    .val {
      font-size: 1.2em;
      @apply font-bold;
    }
  }


  ul {
    @apply border divide-y divide-gray-300;
  }

  li {
    @apply bg-white p-4;
  }

  .ligne {
    @apply flex justify-between;
  }
</style>