<template>
  <div id="app">
    <h1>Simple Vue Input Kit - Demo</h1>
    <form>
      <simple-select
        name="title"
        v-model="title"
        label="Title"
        validation="required"
        list="Titles"
        search-url="https://my-json-server.typicode.com/radoslavtomas/simple-vue-input-kit/lists/"
        @select="handleBlur"
      ></simple-select>

      <simple-input
        v-model="first_name"
        type="text"
        topClassList="first_name"
        :classList="['special', 'different_class']"
        hint="<strong>Lorem ipsum</strong> <br />dolor sit amet consectetur, adipisicing elit. Rem deleniti velit enim porro sequi, fugiat unde obcaecati quos ullam blanditiis dolorum cum nihil facilis similique voluptatibus, accusantium quo laboriosam repellat."
        name="first_name"
        label="First Name"
        validation="required|min_length[3]"
        @change="handleChange"
      ></simple-input>

      <simple-input
        v-model="surname"
        type="text"
        name="surname"
        label="Surname"
        validation="required|max_length[5]"
        @change="handleChange"
      ></simple-input>

      <simple-radio
        name="gender"
        v-model="gender"
        label="Gender"
        validation="required"
        :column="false"
        :list="[
          { code: 'M', description: 'Male' },
          { code: 'F', description: 'Female' }
        ]"
        @select="handleBlur"
      ></simple-radio>

      <simple-date
        name="dob"
        v-model="dob"
        label="Date of birth"
        hint="Must be 17 years in the past"
        validation="required|valid_date|min_years_in_past[17]"
        @blur="handleBlur"
      ></simple-date>

      <simple-list-autocomplete
        v-model="cars"
        name="cars"
        label="What car do you drive? (loaded list search)"
        validation="required|has_valid_value"
        main-value="description"
        display="cars"
        list="Makes"
        search-url="https://my-json-server.typicode.com/radoslavtomas/simple-vue-input-kit/lists/"
        @change="handleChange"
      ></simple-list-autocomplete>

      <simple-ajax-autocomplete
        v-model="cars_ajax"
        name="cars_ajax"
        label="What car do you drive? (ajax search)"
        validation="required|has_valid_value"
        :development="true"
        display="cars ajax"
        code-url="https://my-json-server.typicode.com/radoslavtomas/simple-vue-input-kit/lists/Makes"
        search-url="https://my-json-server.typicode.com/radoslavtomas/simple-vue-input-kit/lists/Makes"
        @change="handleChange"
      ></simple-ajax-autocomplete>

      <simple-radio
        name="card_type"
        v-model="card"
        label="What type of card do you have?"
        validation="required"
        :column="true"
        display="cards"
        list="CreditCardTypes"
        search-url="https://my-json-server.typicode.com/radoslavtomas/simple-vue-input-kit/lists/"
        @select="handleBlur"
      ></simple-radio>

      <simple-radio
        name="rate"
        v-model="rate"
        label="Would you like to rate our app?"
        display="rating"
        validation="required"
        :column="false"
        list="yesno"
        @select="handleBlur"
      ></simple-radio>

      <simple-input
        type="tel"
        name="mobile"
        v-model="mobile"
        label="Mobile number"
        beforeSign="☏"
        validation="required|exact_length[11]"
        @change="handleChange"
      ></simple-input>

      <a href="#" class="btn" @click.prevent="validateForm">Validate</a>
    </form>
  </div>
</template>

<script>
import valForm from "valform";

export default {
  name: "app",
  data() {
    return {
      title: "",
      first_name: "",
      surname: "",
      gender: "",
      dob: "",
      cars: "",
      cars_ajax: "",
      card: "",
      rate: "",
      mobile: ""
    };
  },
  methods: {
    handleBlur(data) {
      console.log(data);
    },
    handleChange(data) {
      console.log(data);
    },
    validateForm() {
      valForm.validateForm();
    }
  },
  mounted() {
    valForm.init({
      validationErrorClass: "error",
      validationValidClass: "valid",
      appendAfter: "simple__input__inner"
    });
  }
};
</script>

<style>
#app {
  width: 35%;
  margin-left: 250px;
}

.btn {
  display: inline-block;
  margin-top: 15px;
  padding: 5px 8px;
  border: 1px solid gray;
}

a.btn {
  color: #252525;
  text-decoration: none;
}

@media (max-width: 950px) {
  #app {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
