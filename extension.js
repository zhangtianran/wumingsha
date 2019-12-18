game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"无名扩展",content:function (config,pack){
    
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
            "司马懿2号":["male","wei",3,["反馈2号","reguicai"],["forbidai"]],
            "孙坚2号":["male","wu",4,["英魂2号","武烈2号","武烈3号"],["forbidai"]],
            "朱然2号":["male","wu",4,["胆守2号","勇烈2号"],["forbidai"]],
            "臧霸2号":["male","wei",4,["朔击","hengjiang"],["forbidai"]],
            "司马昭2号":["male","wei",4,["昭心2号"],["forbidai"]],
            "夏侯霸2号":["male","shu",4,["豹变2号","豹变3号","豹变4号","豹变5号"],["forbidai"]],
            "甘宁2号":["male","wu",4,["qixi","奋威2号"],["forbidai"]],
            "张让2号":["male","qun",3,["劫掠","贪生"],["forbidai"]],
            "马岱2号":["male","shu",4,["mashu","潜袭2号"],["forbidai"]],
            "张任2号":["male","qun",4,["zfengshi","穿心2号"],["forbidai"]],
            "曹操2号":["male","wei",4,["奸雄2号"],[]],
            "公孙瓒2号":["male","qun",4,["义从2号"],["forbidai"]],
        },
        translate:{
            "司马懿2号":"司马懿2号",
            "孙坚2号":"孙坚2号",
            "朱然2号":"朱然2号",
            "臧霸2号":"臧霸2号",
            "司马昭2号":"司马昭2号",
            "夏侯霸2号":"夏侯霸2号",
            "甘宁2号":"甘宁2号",
            "张让2号":"张让2号",
            "马岱2号":"马岱2号",
            "张任2号":"张任2号",
            "曹操2号":"曹操2号",
            "公孙瓒2号":"公孙瓒2号",
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            "反馈2号":{
                trigger:{
                    global:"damageEnd",
                },
                filter:function (event,player){
        return (event.source&&event.source.isAlive&&event.player.classList.contains('dead')==false&&event.player.isAlive());
    },
                logTarget:"player",
                content:function (){
        "step 0"
        event.num=trigger.num;
        "step 1"
        player.judge(function(card){
            if (get.suit(card)=='heart')return -2;
            return 2;
        })
        "step 2"
        if(result.judge==2&&trigger.source.num('he')){
            player.gainPlayerCard(trigger.source,'he');
        }
        event.num--;
        if(event.nem>0){
            player.chooseBool('是否继续发动?');
        }
        "step 3"
        if(event.num){
            event.goto(1);
        }
    },
            },
            "英魂2号":{
                audio:"ext:无名扩展:2",
                audioname:["sunce"],
                trigger:{
                    player:"phaseBegin",
                },
                filter:function (event,player){
        return player.hp<player.maxHp;
    },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('yinghun'),function(card,player,target){
            return player!=target;
        }).set('ai',function(target){
            var player=_status.event.player;
            if(player.maxHp-player.hp==1&&target.countCards('he')==0){
                return 0;
            }
            if(get.attitude(_status.event.player,target)>0){
                return 10+get.attitude(_status.event.player,target);
            }
            if(player.maxHp-player.hp==1){
                return -1;
            }
            return 1;
        });
        "step 1"
        if(result.bool){
            event.num=player.maxHp-player.hp;
            player.logSkill('yinghun',result.targets);
            event.target=result.targets[0];
            if(event.num==1){
                event.directcontrol=true;
            }
            else{
                var str1='摸'+get.cnNumber(event.num,true)+'弃一';
                var str2='摸一弃'+get.cnNumber(event.num,true);
                player.chooseControl(str1,str2,function(event,player){
                    return _status.event.choice;
                }).set('choice',get.attitude(player,event.target)>0?str1:str2);
                event.str=str1;
            }
        }
        else{
            event.finish();
        }
        "step 2"
        if(event.directcontrol||result.control==event.str){
            event.target.draw(event.num);
            event.target.chooseToDiscard(true,'he');
        }
        else{
            event.target.draw();
            event.target.chooseToDiscard(event.num,true,'he');
        }
    },
                ai:{
                    threaten:function (player,target){
            if(target.hp==1||target.countCards('e')>=target.hp) return 2;
            if(target.hp==target.maxHp) return 0.5;
            if(target.hp==2) return 1.5;
            return 0.5;
        },
                    maixie:true,
                    effect:{
                        target:function (card,player,target){
                if(target.maxHp<=3) return;
                if(get.tag(card,'damage')){
                    if(target.hp==target.maxHp) return [0,1];
                }
                if(get.tag(card,'recover')&&player.hp>=player.maxHp-1) return [0,0];
            },
                    },
                },
            },
            "武烈2号":{
                trigger:{
                    player:"equipEnd",
                },
                frequent:true,
                content:function (){
        player.gainMaxHp();
    },
            },
            "武烈3号":{
                trigger:{
                    player:"loseEnd",
                },
                forced:true,
                filter:function (event,player){
        for(var i=0;i<event.cards.length;i++){
            if(event.cards[i].original=='e') return true;
        }
        return false;
    },
                content:function (){
        player.loseMaxHp(true);
    },
            },
            "胆守2号":{
                audio:"ext:极略三国:1",
                trigger:{
                    global:"shaBegin",
                },
                filter:function (event,player){
        return event.target==event.targets[0]&&player.countCards('he')>0&&event.card.name=='sha'&&
        _status.currentPhase==event.player&&event.parent.parent.parent.name=='phaseUse';
    },
                content:function (){
        'step 0'
        trigger.player.chooseToCompare(player);
        'step 1'
        if(result.bool){
            trigger.directHit=true;
        }
        else{
           trigger.untrigger();
           trigger.finish();
        }
    },
            },
            "勇烈2号":{
                audio:"ext:极略三国:1",
                trigger:{
                    global:"damageEnd",
                },
                filter:function (event,player){
        return event.card&&event.card.name=='sha'&&event.notLink()&&event.source.isAlive();
    },
                check:function (event,player){
        if(player.hp>2) return get.attitude(player,event.source)<0;
        return 0;
    },
                logTarget:"player",
                content:function (){
        "step 0"
        player.loseHp();
        player.line(trigger.source);
        trigger.source.damage();
        "step 1"
         var evt=_status.event.getParent('phaseUse');
        if(evt&&evt.name=='phaseUse'){
            evt.skipped=true;
        }

    },
            },
            "朔击":{
                trigger:{
                    global:["phaseDiscardBefore","phaseDiscardSkipped","phaseDiscardCancelled"],
                },
                filter:function (event,player){
        return event.player!=player&&!event.player.needsToDiscard();
    },
                content:function (){
        "step 0"
        if(_status.currentPhase!=player){
            player.chooseBool('是否对'+get.translation(_status.currentPhase)+'使用一张杀？').ai=function(){
                    return get.attitude(player,trigger.player)<0;
                }

        }
        else{
            event.finish();
        }
        "step 1"
        if(result.bool){
   
            player.useCard({name:'sha'},_status.currentPhase,false);
        }
    },
            },
            "昭心2号":{
                trigger:{
                    player:"damageEnd",
                },
                direct:true,
                group:"tianshu_remove",
                createDialog:function (player,target,onlylist){
        var names=[];
        var list=[];
        if(target.name&&!target.isUnseen(0)) names.add(target.name);
        if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
        if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
        var pss=player.getSkills();
        for(var i=0;i<names.length;i++){
            var info=lib.character[names[i]];
            if(info){
                var skills=info[3];
                for(var j=0;j<skills.length;j++){
                    if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                        !lib.skill[skills[j]].unique&&
                        !pss.contains(skills[j])){
                        list.push(skills[j]);
                    }
                }
            }
        }
        if(onlylist) return list;
        var dialog=ui.create.dialog('forcebutton');
        dialog.add('选择获得一项技能');
        _status.event.list=list;
        var clickItem=function(){
            _status.event._result=this.link;
            game.resume();
        };
        for(i=0;i<list.length;i++){
            if(lib.translate[list[i]+'_info']){
                var translation=get.translation(list[i]);
                if(translation[0]=='新'&&translation.length==3){
                    translation=translation.slice(1,3);
                }
                else{
                    translation=translation.slice(0,2);
                }
                var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                item.firstChild.addEventListener('click',clickItem);
                item.firstChild.link=list[i];
            }
        }
        dialog.add(ui.create.div('.placeholder'));
        return dialog;
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt2('nsyaowang'),function(card,player,target){
            var names=[];
            if(target.name&&!target.isUnseen(0)) names.add(target.name);
            if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
            if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
            var pss=player.getSkills();
            for(var i=0;i<names.length;i++){
                var info=lib.character[names[i]];
                if(info){
                    var skills=info[3];
                    for(var j=0;j<skills.length;j++){
                        if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                            !lib.skill[skills[j]].unique&&!pss.contains(skills[j])){
                            return true;
                        }
                    }
                }
                return false;
            }
        }).set('ai',function(target){
            if(get.attitude(_status.event.player,target)>0) return Math.random();
            return 0;
        });
        'step 1'
        if(result.bool){
            event.target=result.targets[0];
            player.logSkill('nsyaowang',event.target);
        }
        else{
            event.finish();
        }
        'step 2'
        event.skillai=function(list){
            return get.max(list,get.skillRank,'item');
        };
        if(event.isMine()){
            event.dialog=lib.skill.tianshu.createDialog(player,target);
            event.switchToAuto=function(){
                event._result=event.skillai(event.list);
                game.resume();
            };
            _status.imchoosing=true;
            game.pause();
        }
        else{
            event._result=event.skillai(lib.skill.nsyaowang.createDialog(player,target,true));
        }
        'step 3'
        _status.imchoosing=false;
        if(event.dialog){
            event.dialog.close();
        }
 
                      var rezult=result;
 
                    target.popup(result);
                    target.disableSkill('chuanxin_disable',result,true);
              
                    player.addSkill(rezult);

                    player.popup(rezult);

        game.log(player,'获得了','【'+get.translation(result)+'】');
 
    },
            },
            "昭无":{
                trigger:{
                    player:"damageEnd",
                },
                direct:true,
                group:"tianshu_remove",
                createDialog:function (player,target,onlylist){
        var names=[];
        var list=[];
        if(target.name&&!target.isUnseen(0)) names.add(target.name);
        if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
        if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
        var pss=player.getSkills();
        for(var i=0;i<names.length;i++){
            var info=lib.character[names[i]];
            if(info){
                var skills=info[3];
                for(var j=0;j<skills.length;j++){
                    if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                        !lib.skill[skills[j]].unique&&
                        !pss.contains(skills[j])){
                        list.push(skills[j]);
                    }
                }
            }
        }
        if(onlylist) return list;
        var dialog=ui.create.dialog('forcebutton');
        dialog.add('选择获得一项技能');
        _status.event.list=list;
        var clickItem=function(){
            _status.event._result=this.link;
            game.resume();
        };
        for(i=0;i<list.length;i++){
            if(lib.translate[list[i]+'_info']){
                var translation=get.translation(list[i]);
                if(translation[0]=='新'&&translation.length==3){
                    translation=translation.slice(1,3);
                }
                else{
                    translation=translation.slice(0,2);
                }
                var item=dialog.add('<div class="popup pointerdiv" style="width:80%;display:inline-block"><div class="skill">【'+
                translation+'】</div><div>'+lib.translate[list[i]+'_info']+'</div></div>');
                item.firstChild.addEventListener('click',clickItem);
                item.firstChild.link=list[i];
            }
        }
        dialog.add(ui.create.div('.placeholder'));
        return dialog;
    },
                content:function (){
        'step 0'
        player.chooseTarget(get.prompt2('nsyaowang'),function(card,player,target){
            var names=[];
            if(target.name&&!target.isUnseen(0)) names.add(target.name);
            if(target.name1&&!target.isUnseen(0)) names.add(target.name1);
            if(target.name2&&!target.isUnseen(1)) names.add(target.name2);
            var pss=player.getSkills();
            for(var i=0;i<names.length;i++){
                var info=lib.character[names[i]];
                if(info){
                    var skills=info[3];
                    for(var j=0;j<skills.length;j++){
                        if(lib.translate[skills[j]+'_info']&&lib.skill[skills[j]]&&
                            !lib.skill[skills[j]].unique&&!pss.contains(skills[j])){
                            return true;
                        }
                    }
                }
                return false;
            }
        }).set('ai',function(target){
            if(get.attitude(_status.event.player,target)>0) return Math.random();
            return 0;
        });
        'step 1'
        
            player.logSkill('nsyaowang',event.target);
       
        'step 2'
        event.skillai=function(list){
            return get.max(list,get.skillRank,'item');
        };
        if(event.isMine()){
            event.dialog=lib.skill.tianshu.createDialog(player,target);
            event.switchToAuto=function(){
                event._result=event.skillai(event.list);
                game.resume();
            };
            _status.imchoosing=true;
            game.pause();
        }
        else{
            event._result=event.skillai(lib.skill.nsyaowang.createDialog(player,target,true));
        }
        'step 3'
        _status.imchoosing=false;
        if(event.dialog){
            event.dialog.close();
        }
 
                   target.popup(result);
                   target.disableSkill('chuanxin_disable',result,true);

            

        game.log(player,'获得了','【'+get.translation(result)+'】');
 
    },
            },
            "豹变2号":{
                skillAnimation:true,
                trigger:{
                    player:"phaseBegin",
                },
                forced:true,
                filter:function (event,player){
    return player.hp<=3;
},
                content:function (){
            var card=get.cardPile('guanshi','field');
        if(card){
            player.gain(card);
        }

    },
            },
            "豹变3号":{
                trigger:{
                    player:"loseEnd",
                },
                direct:true,
                audio:"ext:无名扩展:2",
                filter:function (event,player){
        if(player.countCards('h')) return false;
        if(player.hp>2) return false;
        for(var i=0;i<event.cards.length;i++){
            if(event.cards[i].original=='h') return true;
        }
        return false;
    },
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('sijian'),function(card,player,target){
            return player!=target;
        });
        "step 1"
        if(result.bool){
            player.logSkill('sijian',result.targets);
            event.target=result.targets[0];
            event.target.damage();
        }
        else{
            event.finish();
        }
    },
                ai:{
                    expose:0.2,
                },
            },
            "豹变4号":{
                audio:"ext:无名扩展:2",
                trigger:{
                    player:"phaseDrawBegin",
                },
                filter:function (event,player){
        return player.hp<=1;
    },
                frequent:true,
                content:function (){
        trigger.num++;
    },
                ai:{
                    threaten:1.3,
                },
            },
            "豹变5号":{
                filter:function (event,player){
        return player.hp<=1;
    },
                mod:{
                    maxHandcard:function (player,num){
            return ((num<=1)?2:num);
        },
                },
            },
            "奋威2号":{
                skillAnimation:true,
                audio:"ext:无名扩展:2",
                trigger:{
                    global:"useCard",
                },
                priority:5,
                filter:function (event,player){
        if(get.type(event.card)!='trick') return false;
        if(get.info(event.card).multitarget) return false;
        if(event.targets.length<2) return false;
        return true;
    },
                init:function (player){
        player.storage.fenwei=false;
    },
                direct:true,
                content:function (){
        "step 0"
        player.chooseTarget(get.prompt('fenwei'),
            [1,trigger.targets.length],function(card,player,target){
            return _status.event.getTrigger().targets.contains(target);
        }).set('ai',function(target){
            var trigger=_status.event.getTrigger();
            if(game.phaseNumber>game.players.length*2&&trigger.targets.length>=game.players.length-1){
                return -get.effect(target,trigger.card,trigger.player,_status.event.player);
            }
            return -1;
        });
        "step 1"
        if(result.bool){
            player.logSkill('fenwei',result.targets);
            if(result.targets.length>=2)player.loseHp();
            for(var i=0;i<result.targets.length;i++){
                trigger.targets.remove(result.targets[i]);
            }
            game.delay();
        }
    },
                intro:{
                    content:"limited",
                },
            },
            "劫掠":{
                trigger:{
                    player:"gainEnd",
                },
                filter:function (event,player){
        return event.source&&event.source!=player;
    },
                direct:true,
                content:function (){
        trigger.source.damage();
    },
            },
            "贪生":{
                audio:"ext:无名扩展:2",
                trigger:{
                    global:"recoverAfter",
                },
                direct:true,
                filter:function (event,player){
        return event.player!=player;
    },
                content:function (){
        player.recover();
    },
            },
            "潜袭2号":{
                audio:"ext:无名扩展:2",
                trigger:{
                    global:"phaseBegin",
                },
                content:function (){
        "step 0"
        player.draw();
        player.chooseToDiscard('he',true);
        "step 1"
        if(!result.bool){
            event.finish();
            return;
        }
        event.color=get.color(result.cards[0]);
        player.chooseTarget(function(card,player,target){
            return player!=target&&get.distance(player,target)<=1;
        },true).set('ai',function(target){
            return -get.attitude(_status.event.player,target);
        });
        "step 2"
        if(result.bool&&result.targets.length){
            result.targets[0].storage.qianxi2=event.color;
            result.targets[0].addSkill('qianxi2');
            player.line(result.targets,'green');
            game.addVideo('storage',result.targets[0],['qianxi2',event.color]);
        }
    },
            },
            "穿心2号":{
                trigger:{
                    source:"damageBefore",
                },
                filter:function (event,player){
        if(event.card&&(event.card.name=='sha'||event.card.name=='juedou')){
            if(get.mode()=='guozhan'){
                return (event.player.identity!='qun'||player.identity=='ye')&&
                !event.player.isUnseen()&&event.player.hasViceCharacter();
            }
            else{
                var info=lib.character[event.player.name];
                if(!info) return false;
                var skills=event.player.getSkills();
                for(var i=0;i<info[3].length;i++){
                    if(lib.skill[info[3][i]].fixed) continue;
                    if(skills.contains(info[3][i])) return true;
                }
            }
        }
        return false;
    },
                logTarget:"player",
                check:function (event,player){
        if(event.player.hasSkill('subplayer')) return false;
        if(get.attitude(player,event.player)<0){
            if(event.player.hp==1) return false;
            return true;
        }
        return false;
    },
                content:function (){
        'step 0'
        trigger.cancel();
        if(trigger.player.countCards('e')){
            trigger.player.chooseControl(function(event,player){
                if(player.hp==1) return 1;
                if(player.hp==2&&player.countCards('e')>=2) return 1;
                return 0;
            }).set('choiceList',['弃置装备区内的所有牌并失去一点体力',get.mode()=='guozhan'?'移除副将牌':'随机移除武将牌上的一个技能']);
        }
        else{
            event._result={index:1};
        }
        'step 1'
        if(result.index==1){
            if(get.mode()!='guozhan'){
                trigger.player.clearSkills();
                player.draw(trigger.player.hp);
            }
            else{
                trigger.player.removeCharacter(1);
            }
        }
        else{
            trigger.player.discard(trigger.player.getCards('e'));
            trigger.player.loseHp();
        }
    },
            },
            "奸雄2号":{
                audio:"ext:无名扩展:2",
                trigger:{
                    global:"damageEnd",
                },
                direct:true,
                content:function (){
        "step 0"
        if(get.itemtype(trigger.cards)=='cards'&&get.position(trigger.cards[0])=='d'){
            player.chooseControl('rejianxiong_mopai','rejianxiong_napai','cancel2').set('prompt',get.prompt('rejianxiong')).ai=function(){
                var trigger=_status.event.getTrigger();
                if(trigger.cards.length==1&&trigger.cards[0].name=='sha') return 0;
                return 1;
            };
        }
        else{
            player.chooseControl('rejianxiong_mopai','cancel2').set('prompt',get.prompt('rejianxiong'));
        }
        "step 1"
        if(result.control=='rejianxiong_napai'){
            player.logSkill('rejianxiong');
            trigger.player.gain(trigger.cards);
            trigger.player.$gain2(trigger.cards);
        }
        else if(result.control=='rejianxiong_mopai'){
            player.logSkill('rejianxiong');
            trigger.player.draw();
        }
    },
                ai:{
                    maixie:true,
                    "maixie_hp":true,
                    effect:{
                        target:function (card,player,target){
                if(player.hasSkillTag('jueqing',false,target)) return [1,-1];
                if(get.tag(card,'damage')&&player!=target) return [1,0.6];
            },
                    },
                },
            },
            "义从2号":{
                mod:{
                    globalTo:function (from,to,distance){
          return distance+to.maxHp-to.hp;
        },
                    globalFrom:function (from,to,distance){
          return distance-from.hp;
    },
                },
            },
        },
        translate:{
            "反馈2号":"反馈2号",
            "反馈2号_info":"每当一名角色受到其他角色伤害时，你可进行一次判断。若不为红桃，你获得伤害来源一张牌",
            "英魂2号":"英魂2号",
            "英魂2号_info":"准备阶段开始时，若你已受伤，你可令一名其他角色执行一项：摸X张牌，然后弃置一张牌；或摸一张牌，然后弃置X张牌。",
            "武烈2号":"武烈2号",
            "武烈2号_info":"",
            "武烈3号":"武烈3号",
            "武烈3号_info":"",
            "胆守2号":"胆守2号",
            "胆守2号_info":"当一名角色使用【杀】后，若你与其均有手牌，你可以与其拼点，若你赢，你摸一张牌，然后弃置其一张牌；若你没赢，此【杀】不可被【闪】响应。",
            "勇烈2号":"勇烈2号",
            "勇烈2号_info":"当你攻击范围内的一名角色受到【杀】造成的一次伤害后，你可以失去1点体力，然后对伤害来源造成1点伤害。",
            "朔击":"朔击",
            "朔击_info":"",
            "昭心2号":"昭心2号",
            "昭心2号_info":"每当你受到一次伤害后，你可以获得一名其他角色的一项技能（限定技，主公技除外），然后该角色失去此技能",
            "昭无":"昭无",
            "昭无_info":"每当你受到一次伤害后，你可以获得一名其他角色的一项技能（限定技，主公技除外），然后该角色失去此技能",
            "豹变2号":"豹变2号",
            "豹变2号_info":"回合准备阶段开始时，你从场上获得一张贯石斧",
            "豹变3号":"豹变3号",
            "豹变3号_info":"当你失去最后的手牌时，你可以弃置一名其他角色的一张牌。",
            "豹变4号":"豹变4号",
            "豹变4号_info":"摸牌阶段，你可以额外摸一张牌",
            "豹变5号":"豹变5号",
            "豹变5号_info":"",
            "奋威2号":"奋威2号",
            "奋威2号_info":"当一名角色使用的锦囊牌指定了至少两名角色为目标时，你可以失去一点体力令此牌对其中任意名角色无效。",
            "劫掠":"劫掠",
            "劫掠_info":"每当你从其他角色处获得一次牌时，可令一名其他角色弃置你一张牌，然后你弃置其一张牌。",
            "贪生":"贪生",
            "贪生_info":"当一名角色于其出牌阶段内回复体力时，你可以选择一项：1、摸一张牌；2、令该角色摸两张牌 ",
            "潜袭2号":"潜袭2号",
            "潜袭2号_info":"准备阶段，你可以摸一张牌，并弃置一张牌，然后令一名距离为1的角色不能使用或打出与你弃置的牌颜色相同的手牌，直到回合结束。",
            "穿心2号":"穿心2号",
            "穿心2号_info":"当你于出牌阶段内使用【杀】或【决斗】对目标角色造成伤害时，你可以防止此伤害。若如此做，该角色选择一项：1.弃置装备区里的所有牌，若如此做，其失去1点体力；2.随机移除主武将牌上的一个技能",
            "奸雄2号":"奸雄2号",
            "奸雄2号_info":"每当你受到伤害后，你可以选择一项：摸一张牌，或获得对你造成伤害的牌。",
            "义从2号":"义从2号",
            "义从2号_info":"摸牌阶段开始时，若有其他角色与你距离不大于1，则你可以放弃摸牌。若如此做，你的防御距离+X（X为势力数）",
        },
    },
    intro:"",
    author:"无名玩家",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["司马懿2号.jpg","张让2号.jpg","马岱2号.jpg","张任2号.jpg","公孙瓒2号.jpg","孙坚2号.jpg","朱然2号.jpg","司马昭2号.jpg","臧霸2号.jpg","甘宁2号.jpg","夏侯霸2号.jpg","曹操2号.jpg"],"card":[],"skill":[]}}})
