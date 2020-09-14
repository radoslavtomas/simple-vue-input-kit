<template>
  <div id="app">
    <h1>Simple Vue Input Kit - Demo</h1>
    <form action method="POST" id="demo_form">
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
        size="third"
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

      <simple-date-alt
        name="licence"
        v-model="licence"
        label="Driver licence date"
        validation="required"
        @blur="handleBlur"
      ></simple-date-alt>

      <simple-sort-code
        name="sortcode"
        v-model="sortCode"
        label="Sort code"
        hint="Must be in format XX-XX-XX"
        validation="required|numeric|exact_length[6]"
        @blur="handleBlur"
      ></simple-sort-code>

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
        beforeSign="phone-alt"
        validation="required|exact_length[11]"
        @change="handleChange"
      ></simple-input>

      <simple-checkbox
        name="hobbies"
        label="What are your hobbies?"
        :boxes="hobbies"
        return="yes-no"
        v-model="hobbiesValues"
        hint="<strong>Lorem ipsum</strong> <br />dolor sit amet consectetur, adipisicing elit. Rem deleniti velit enim porro sequi, fugiat unde obcaecati quos ullam blanditiis dolorum cum nihil facilis similique voluptatibus, accusantium quo laboriosam repellat."
        validation="required"
        @change="handleChange"
      ></simple-checkbox>

      <div v-if="formValid != null && formValid === true" class="message valid">
        {{ messages.valid }}
      </div>
      <div
        v-if="formValid != null && formValid === false"
        class="message invalid"
      >
        {{ messages.invalid }}
      </div>

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
      gender: "M",
      dob: "",
      licence: "201306",
      sortCode: "",
      cars: "",
      cars_ajax: "",
      card: "",
      rate: "",
      mobile: "",
      messages: {
        valid: "Form is valid, ready to submit",
        invalid: "Form is not valid yet"
      },
      formValid: null,
      hobbiesValues: {
        hobby1: "N",
        hobby2: "Y",
        hobby3: "N",
        hobby4: "N"
      },
      hobbies: [
        {
          name: "hobby1",
          label: "Traveling"
        },
        {
          name: "hobby2",
          label: "Reading"
        },
        {
          name: "hobby3",
          label: "Music"
        },
        {
          name: "hobby4",
          label: "Unicorn hunting"
        }
      ]
    };
  },
  methods: {
    handleBlur(data) {
      console.log(data);
    },
    handleChange(data) {
      console.log(data);
    },
    updateDelivery() {
      console.log(this.deliveryValue.documentdelivery);
    },
    async validateForm() {
      const valid = await valForm.validateForm("demo_form");
      this.formValid = valid ? true : false;
    }
  },
  mounted() {
    valForm.init({
      formId: "demo_form",
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
  margin-bottom: 50px;
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

.message {
  color: #fff;
  padding-left: 12px;
  height: 40px;
  line-height: 40px;
  width: calc(100% - 30px);
}

.message.valid {
  background-color: green;
}

.message.invalid {
  background-color: red;
}

@media (max-width: 950px) {
  #app {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
