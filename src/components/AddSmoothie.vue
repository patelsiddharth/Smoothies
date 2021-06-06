<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">
            Add New Smoothie Recipe
        </h2>
        <form @submit.prevent="AddSmoothie" autocomplete="false">
            <div class="field title">
                <label for="title">Smoothie Title : </label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient : </label>
                <input type="text" id="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="DeleteIngredient(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="ingredient">Add an ingredient : </label>
                <input type="text" id="ingredient" 
                    placeholder="Press tab to add ingredient"
                    @keydown.tab.prevent="AddIngredient"
                    v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn pink">
                    Add Smoothie
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import fireStore from '../Firebase/init';
import slugify from 'slugify';
export default {
    data()
    {
        return{
            title : null,
            another : null,
            feedback : null,
            ingredients : [],
            slug : ''
        }
    },
    methods : {
        AddSmoothie()
        {
            if(this.title)
            {
                this.feedback = null;
                this.slug = slugify(this.title, { replacement : '-', remove : /[$*_+~.()'"!\-:@]/g, lower : true})
                fireStore.collection('smoothies').add({
                    title : this.title,
                    slug : this.slug,
                    ingredients : this.ingredients
                }).then(() => {
                    this.$router.push({name : 'Index'})
                }).catch(e => console.log(e))
            }
            else
            {
                this.feedback = 'You must add a title to continue'
            }
        },
        AddIngredient()
        {
            if(this.another)
            {
                this.ingredients.push(this.another);
                this.feedback = null;
                this.another = null;
            }
            else
            {
                this.feedback = 'You must add an ingredient to continue'
            }
        },
        DeleteIngredient(ing)
        {
            this.ingredients = this.ingredients.filter(i => i !== ing)
        }
    }
}
</script>

<style>
.add-smoothie
{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2
{
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field
{
    margin: 20px auto;
    position: relative;
}
.add-smoothie .delete
{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>