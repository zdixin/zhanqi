import * as types from './mutation-type'
const mutations = {
  [types.SET_PLAYER](state,player){
    state.player=player;
  },
  [types.SET_GAME_DETAIL](state,game){
    state.game=game;
  }

}
export default mutations;
