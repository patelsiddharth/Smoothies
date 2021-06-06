<template>
    <div class="edit-smoothie container" v-if="smoothie">
        <h2>Edit {{smoothie.title}} Smoothie</h2>
        <p>{{this.$route.params.smoothie_slug}}</p>
        <form @submit.prevent="EditSmoothie" autocomplete="false">
            <div class="field title">
                <label for="title">Smoothie Title : </label>
                <input type="text" name="title" id="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient : </label>
                <input type="text" id="ingredient" v-model="smoothie.ingredients[index]">
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
                    Update Smoothie
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import fireStore from '../Firebase/init';
import slugify from 'slugify';

export default {
    name : 'EditSmoothie',
    data()
    {
        return{
            smoothie : null,
            another : null,
            feedback : null
        }
    },
    methods : {
        EditSmoothie()
        {
            if(this.smoothie.title)
            {
                this.feedback = null;
                this.smoothie.slug = slugify(this.smoothie.title, { replacement : '-', remove : /[$*_+~.()'"!\-:@]/g, lower : true})
                fireStore.collection('smoothies').doc(this.smoothie.id).update({
                    title : this.smoothie.title,
                    slug : this.smoothie.slug,
                    ingredients : this.smoothie.ingredients
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
                this.smoothie.ingredients.push(this.another);
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
            this.smoothie.ingredients = this.smoothie.ingredients.filter(i => i !== ing)
        }
    },
    created()
    {
        const ref = fireStore.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id;
            })
        })
    }
}
</script>

<style>
.edit-smoothie
{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2
{
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field
{
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete
{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>