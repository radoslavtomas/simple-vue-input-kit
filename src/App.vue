<template>
  <div id="app">
    <h1>Hello New Inputs</h1>
    <form>
      <simple-select
        name="title"
        v-model="title"
        label="Title"
        hint="This is new hint about something"
        validation="required"
        list="Titles"
        default="Mrs"
        search-url="https://api.quotelinedirect.co.uk/miscellaneous/lists/get/list/?list=lkp_"
        @select="handleBlur"
      ></simple-select>

      <simple-list-autocomplete
        v-model="makes"
        name="makes"
        label="Cars"
        validation="required|has_valid_value"
        main-value="description"
        list="Makes"
        search-url="https://api.quotelinedirect.co.uk/miscellaneous/lists/get/list/?list=lkp_"
        @change="handleChange"
      ></simple-list-autocomplete>

      <simple-ajax-autocomplete
        v-model="occupation"
        name="occupation"
        label="Occupation"
        validation="required|has_valid_value"
        code-url="https://api.quotelinedirect.co.uk/occupation/occupations/get/bycode/?code="
        search-url="https://api.quotelinedirect.co.uk/occupation/occupations/get/bysearch/?keyword="
        @change="handleChange"
      ></simple-ajax-autocomplete>

      <simple-ajax-autocomplete
        v-model="employment"
        name="employment"
        label="Employment"
        validation="required|has_valid_value"
        main-value="code"
        code-url="https://api.quotelinedirect.co.uk/occupation/employers/get/bycode/?code="
        search-url="https://api.quotelinedirect.co.uk/occupation/employers/get/bysearch/?keyword="
        @change="handleChange"
      ></simple-ajax-autocomplete>

      <simple-date
        name="dob"
        v-model="dob"
        label="Date of birth"
        hint="This is new hint about DOB"
        validation="required|valid_date|min_years_in_past[5]"
        class-list="hello"
        default="05/05/2010"
        @blur="handleBlur"
      ></simple-date>

      <simple-radio
        name="gender"
        v-model="gender"
        label="Gender"
        hint="This is new hint about gender"
        validation="required"
        :column="false"
        :list="[
          { code: 'M', description: 'Male' },
          { code: 'F', description: 'Female' }
        ]"
        @select="handleBlur"
      ></simple-radio>

      <simple-radio
        name="fuel"
        v-model="fuel"
        label="Fuel type"
        hint="This is new hint about fuel"
        validation="required"
        :column="true"
        list="Fuel"
        search-url="https://api.quotelinedirect.co.uk/miscellaneous/lists/get/list/?list=lkp_"
        @select="handleBlur"
      ></simple-radio>

      <simple-radio
        name="resident"
        v-model="resident"
        label="Have you lived in UK since birth?"
        display="Resident"
        validation="required"
        :column="false"
        list="yesno"
        @select="handleBlur"
      ></simple-radio>

      <simple-input
        v-model="name"
        type="text"
        topClassList="bollington"
        :classList="['hello', 'kitty']"
        hint="<strong>Lorem ipsum</strong> <br />dolor sit amet consectetur, adipisicing elit. Rem deleniti velit enim porro sequi, fugiat unde obcaecati quos ullam blanditiis dolorum cum nihil facilis similique voluptatibus, accusantium quo laboriosam repellat."
        name="first_name"
        label="First Name"
        validation="required|min_length[3]"
        @change="handleChange"
      ></simple-input>

      <simple-input
        v-model="surname"
        type="text"
        hint="This is new hint about something"
        topClassList="bollington"
        :classList="['hello', 'kitty']"
        name="surname"
        label="Surname"
        validation="required|max_length[5]"
        @change="handleChange"
      ></simple-input>

      <simple-input
        type="text"
        name="address"
        v-model="address"
        label="Address line"
        placeholder="number or house name"
        validation="required|max_length[32]"
        @change="handleChange"
      ></simple-input>

      <simple-input
        type="text"
        name="postcode"
        v-model="postcode"
        label="Postcode"
        :classList="['uppercase', 'hello', 'kitty']"
        validation="required"
        @change="handleChange"
      ></simple-input>

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
      title: "Mr",
      name: "Rado",
      surname: "",
      dob: "05/05/2000",
      address: "",
      postcode: "",
      mobile: "",
      gender: "",
      fuel: "E",
      resident: "Y",
      makes: "Toyota",
      employment: "086",
      occupation: "165"
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
  margin: 0 auto;
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

@media (max-width: 800px) {
  #app {
    width: 95%;
  }
}
</style>
