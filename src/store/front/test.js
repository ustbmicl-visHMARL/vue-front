import { reqAddTest, reqGetUserList,reqGetTestList, reqUpdateTestInfo, reqDelUser, reqFrontUpdateTestInfo} from '@/api'


//state对象，存储组件的状态
const state = {
    testlist: [], // 实验列表
    test_count: 2, // 实验数量
}
//唯一可以修改组件状态state值的方法，同步阻塞
const mutations = {
    // 获取用户列表 state为设置的state对象，result为传进来进行更新的数据
    GETTESTLIST(state, result) {
        state.testlist = result.data
        state.test_count = result.test_count
    },
}

const actions = {
    // 添加实验
    async addTest({ commit }, test) {//eslint-disable-line no-unused-vars
        
        let result = await reqAddTest(test)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 获取用户列表
    async getTestList({ commit }, info) {
       let result = await reqGetTestList(info)
        // let result = await reqGetUserList(info)
        result = result.data
        
        if (result.status === 0) {
            commit('GETTESTLIST', result)
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 修改实验信息
    async updateTestInfo({ commit }, test) {
       
        let result = await reqUpdateTestInfo(test)
        result = result.data
       
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
    // 封禁用户
    async delUser({ commit }, user = {}) {//eslint-disable-line no-unused-vars
        let result = await reqDelUser(user)
        result = result.data
        // console.log(result)
        if (result.status === 0) {
            return result.msg || 'ok'
        } else {
            return Promise.reject(new Error(result.msg || 'fail'))
        }
    },
}
//取值的方法 通过该方法获取组件的状态
const getters = {
    testlist(state) {
        return state.testlist || []
    },
    test_count(state) {
        return state.test_count || 0
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}