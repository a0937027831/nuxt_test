import api from "~/tool/api/api"


// index page api

const postIndexMatchList = (data) => {
    return api("post", "/web/live/indexMatchList?parameter=1", data);
}

const postQuizList = ()=>{
    return api("post", "/web/quiz/quizList?parameter=1");
}

const postScore = (data)=>{
    return api("post", "/web/data/score?parameter=1",data);
}



//---------------------------------------------

//---- pages web -------------------------------

const postindexMatchAmount = (data) => {
    return api("post", "/web/live/indexMatchAmount?parameter=1", data);
}

const postNoticeIndex = (data) => {
    return api("post", "/web/notice/index?parameter=1", data);
}

const postNewsIndex = (data)=>{
    return api("post", "/web/news/index?parameter=1", data);
}

const postShooter = (data)=>{
    return api("post", "/web/data/shooter?parameter=1", data);
}

//--------------pages web betting--------------------------------
const postTurnoverRank = (data)=>{
    return api("post", "/web/quiz/turnoverRank?parameter=1", data);
}

const postQuizVoteList = (data)=>{
    return api("post","/web/quiz/quizVoteList?parameter=1",data);
}

const postSchedule = (data)=>{
    return api("post","/web/quiz/schedule?parameter=1",data);
}

//----------------------------------------------------------------

//------------ pages web liveDetail  -----------------------------------------

const postAnalysis = (data)=>{
    return api("post","/web/live/analysis?parameter=1",data);
}

const postLiveDetail = (data)=>{
    return api("post","/web/live/detail?parameter=1",data);
}

//-----------------------------------------------------------------------------

//-------------- pages web record --------------------------------------

const postPlayers = (data)=>{
    return api("post","/web/data/players?parameter=1",data);
}

const postTeams = (data)=>{
    return api("post","/web/data/teams?parameter=1",data);
}

const postRank = (data)=>{
    return api("post","/web/data/rank?parameter=1",data);
}
//-----------------------------------------------------------------------------

//----------------pages activity ----------------------------------------------

const postDetail = (data) =>{
    return api("post","/web/news/detail?parameter=1",data)
}

//-----------------------------------------------------------------------------

//------------- pages live ----------------------------------------------------

const postLiveIndex = (data)=>{
    console.log('postLiveIndex');
    return api("post","/web/live/index?parameter=1",data)
}

const postCalendarMatchAmount = (data)=>{
    return api("post","/web/live/calendarMatchAmount?parameter=1",data)
}
//-----------------------------------------------------------------------------

//------------- pages information ---------------------------------------------------

const postNewsList = (data)=>{
    return api("post","/web/redirectWeb/getNewsList?parameter=1",data);
}
//------------------------------------------------------------------------------------


//------------------------------------------------------------------------------
const postNewsDetail = (data)=>{
    return api("post","/web/redirectWeb/getNewsDetail?parameter=1",data);
}
//------------------------------------------------------------------------------

//------------------ store index -------------------------------------------------------

const postInitializeIndex = (data)=>{
    return api("post","web/initialize/index?parameter=1",data)
}

//----------------------------------------------------------------------------

export const apiIndexMatchList = postIndexMatchList;
export const apiQuizList = postQuizList;
export const apiScore = postScore;

export const apiIndexMatchAmount = postindexMatchAmount;
export const apiNoticeIndex = postNoticeIndex;
export const apiNewsIndex = postNewsIndex;
export const apiShooter = postShooter;

export const apiTurnoverRank = postTurnoverRank;
export const apiQuizVoteList = postQuizVoteList;
export const apiSchedule = postSchedule;

export const apiAnalysis = postAnalysis;
export const apiLiveDetail = postLiveDetail;

export const apiPlayers = postPlayers;
export const apiTeams = postTeams;
export const apiRank = postRank;

export const apiDetail = postDetail;

export const apiLiveIndex = postLiveIndex;
export const apiCalendarMatchAmount = postCalendarMatchAmount;

export const apiInitializeIndex = postInitializeIndex;

export const apiNewsList = postNewsList;
export const apiNewsDetail = postNewsDetail;