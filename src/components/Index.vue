<template>
    <div class="index container">
        <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
            <div class="card-content">
                <i class="material-icons delete" @click="DeleteSmoothie(smoothie.id)">delete</i>
                <h2 class="indigo-text">{{smoothie.title}}</h2>
                <ul class="ingredients">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                        <span class="chip">
                            {{ingredient}}
                        </span>
                    </li>
                </ul>
            </div>
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to="{name : 'EditSmoothie', params : {smoothie_slug : smoothie.slug}}">
                    <i class="material-icons edit">edit</i>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import fireStorage from '../Firebase/init';

export default {
    name : "Index",
    data()
    {
        return{
            smoothies : []
        }
    },
    methods : {
        DeleteSmoothie(id)
        {
            fireStorage.collection('smoothies').doc(id).delete()
            .then(() => {
                this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id)
            })
        }
    },
    created()
    {
        fireStorage.collection('smoothies').get()
            .then(res => {
                res.forEach(doc => {
                    this.smoothies.push({...doc.data() , id : doc.id});
                })
            })
    }
}
</script>

<style>
.index
{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2
{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
}
.index .ingredients
{
    margin: 30px auto;   
}
.index .ingredients li
{
    display: inline-block;
}
.index .delete
{
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    color: #aaa;
    font-size: 1.4em;
}
</style>