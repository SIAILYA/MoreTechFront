import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {BACKEND} from "../../backend.config";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        datasets: [],
        loadingDatasets: null,
        searchQuery: "",
        searchTime: 0,
        activeDataset: {},
        user: {},
        activeTask: {},
        task: {}
    },
    actions: {
        searchDatasets(ctx, query) {
            ctx.commit("setLoading", true)
            ctx.commit("setQuery", query)
            axios.get(BACKEND + "/search_datasets/" + query).then(r => {
                ctx.commit("updateDatasets", r.data.datasets.sort((el, el2) => {
                    return el2.score - el.score
                }))
                ctx.commit("setLoading", false)
                ctx.commit("setTime", r.data.date)
            })
        },
        setQuery(ctx, e) {
            ctx.commit("setQuery", e.currentTarget.value)
        },
        sortDatasets(ctx, sort) {
            var dt
            if (sort === "Рейтинг (вниз)") {
                dt = ctx.state.datasets.sort((el, el2) => {
                    return el2.score - el.score
                })
            } else if (sort === "Оценки (вниз)") {
                dt = ctx.state.datasets.sort((el, el2) => {
                    return el2.vote_count - el.vote_count
                })
            } else if (sort === "Рейтинг (вверх)") {
                dt = ctx.state.datasets.sort((el, el2) => {
                    return el.score - el2.score
                })
            } else {
                dt = ctx.state.datasets.sort((el, el2) => {
                    return el.vote_count - el2.vote_count
                })
            }

            ctx.commit("updateDatasets", dt)
        },
        getDataset(ctx, did) {
            ctx.commit("setLoading", true)
            axios.get(BACKEND + "/search_dataset/" + did).then(r => {
                ctx.commit("setActiveDataset", r.data)
                ctx.commit("setLoading", false)
            })
        },
        getPopular(ctx) {
            ctx.commit("setLoading", true)
            axios.get(BACKEND + "/get_pop").then(r => {
                ctx.commit("updateDatasets", r.data)
                ctx.commit("setLoading", false)
            })
        },
        setLoadingState(ctx, s) {
            ctx.commit("setLoading", s)
        },
        userLogin(ctx, user) {
            ctx.commit("updateUser", user)
        },
        getTask(ctx, tid) {
            ctx.commit("setLoading", true)
            axios.post(BACKEND + "/get_task", {task_id: tid}).then(r => {
                ctx.commit("setTask", r.data)
                ctx.dispatch("getDataset", r.data.dataset_id)
            })
        }
    },
    mutations: {
        updateDatasets(state, data) {
            state.datasets = data
        },
        setTask(state, t) {
            state.task = t
        },
        setLoading(state, load) {
            state.loadingDatasets = load
        },
        setQuery(state, q) {
            state.searchQuery = q
        },
        setTime(state, time) {
            state.searchTime = time
        },
        setActiveDataset(state, ds) {
            state.activeDataset = ds
        },
        updateUser(state, user) {
            state.user = user
        }
    },
    getters: {
        getSearchDatasets(state) {
            return state.datasets
        },
        getLoadingDatasets(state) {
            return state.loadingDatasets
        },
        getQuery(state) {
            return state.searchQuery
        },
        getSearchTime(state) {
            return state.searchTime
        },
        getActiveDataset(state) {
            return state.activeDataset
        },
        getUser(state) {
            return state.user
        },
        currentTask(state) {
            return state.task
        }
    },
    modules: {}
})
