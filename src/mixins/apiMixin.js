export default {
  methods: {
    async fetchList(list) {
      if (!list) {
        console.log("No list provided");
        return null;
      }

      try {
        const data = await this.getData(`${this.searchUrl}${list}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getData(url = "") {
      const response = await fetch(url);
      return await response.json();
    }
  }
};
