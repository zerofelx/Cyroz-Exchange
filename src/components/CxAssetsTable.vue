<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder == 1, down: this.sortOrder == -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder()"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-200 focus:outline-none border-b border-gray-400 py-2 px-4 block"
            type="text"
            id="filter"
            placeholder="Buscar..."
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="a in filteredAssets"
        v-bind:key="a.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            style="max-width: 5vw"
            :src="
              `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
            "
            :alt="a.name"
          />
        </td>
        <td>
          <b>#{{ a.rank }}</b>
        </td>
        <td>
          <router-link
            class="uppercase text-green-600 hover:underline"
            :to="{ name: 'coin-detail', params: { id: a.id } }"
            >{{ a.id }}</router-link
          >
          <small class="ml-1 text-gray-500">{{ a.symbol }}</small>
        </td>
        <td>{{ a.priceUsd | dollar }}</td>
        <td>{{ a.marketCapUsd | dollar }}</td>
        <td
          :class="
            a.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ a.changePercent24Hr | percent }}
        </td>
        <td class="hidden sm:block">
          <cx-button @click="goToCoin(a.id)">
            <span>Detalle</span>
          </cx-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CxButton from '@/components/CxButton';

export default {
  name: 'CxAssetsTable',
  data() {
    return {
      filter: '',
      sortOrder: 1
    };
  },
  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder == 1 ? -1 : 1;

      return this.assets
        .filter(
          a =>
            a.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            a.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    }
  },
  components: {
    CxButton
  },
  methods: {
    changeSortOrder() {
      this.sortOrder = this.sortOrder == 1 ? -1 : 1;
    },
    goToCoin(id) {
      this.$router.push({ name: 'coin-detail', params: { id: id } });
    }
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.up::before {
  content: '👆';
}

.down::before {
  content: '👇';
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
