import os
import time
import json
import logging

import jinja2
import webapp2
import newModel
import threading

from google.appengine.api import taskqueue
from google.appengine.ext import ndb
from google.appengine.ext import deferred

JINJA_ENV = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

#question0 contains 5 questions and qustion1~5 contains the answer.

question0 = ['What would you do if you were one of the male attorneys in the chamber room?',
             'What would you advise Jennifer if you were Nancy?',
             'Is it related to implicit bias?',
             'What do you think of Chelsea\'s contribution in originating the cases with diversity requirements?',
             'Is it a reasonable practice to have Felipe meeting the client and Jason secretly coach him at the back?']

question1 = ['Smile, as it was funny.', 
             'Point out immediately to the judge that it was not a proper thing to say.', 
             'Do not respond in the moment, but talk with Jennifer afterward to offer her support.', 
             'Do not respond in the moment, but mention it to the judge privately afterward.']

question2 = ['The cost of proving sexual harassment is really high. This incident is likely to be ignored, even if Jennifer files a complaint. It is not worth reporting.', 
             'She should speak up on this matter; otherwise, the situation will get worse.',
             'She is correct in trying to speak up on this matter, but she is also at risk of losing her career in the firm or even in the legal profession as a whole.',
             'It\'s unlikely that the Judge would retaliate; hopefully, he would change his behavior.']
question3 = ['Yes. It is very common that female lawyers get lower salaries than the male lawyers',
             'No. More experience does not necessarily mean her performance is better',
             'Not Sure. More information is needed before a conclusion can be reached']
question4 = ['She was the vital contributor. The firm would not be able to land the clients without her',
             'She only attended a few meetings. Her contribution is limited',
             'She was not the one connecting with the client. She should not have any origination credits.']
question5 = ['Yes. It is the only way to satisfy the client\'s needs.',
             'No. The coordination between Jason and Felipe may introduce unexpected issues which are also a significant risk',
             'Yes. It is more likely to win the case when Jason and Felipe work together, and both of them can benefit financially from the case',
             'No. It is not fair for both Jason and Felipe. Jason cannot demonstrate his skill in front of the client, while Felipe is forced to work in the field out of his expertise.']

userNum = 0
selectedNum = 0
class MatchSelection(ndb.Model):
    name = ndb.StringProperty()
    selA = ndb.IntegerProperty(default=0)
    selB = ndb.IntegerProperty(default=0)
    selC = ndb.IntegerProperty(default=0)
    selD = ndb.IntegerProperty(default=0)
    selE = ndb.IntegerProperty(default=0)

    @staticmethod
    def createMatch():
        for i in range(1, 6):
            MatchSelection(name = 'student' + str(i),
                           selA = 0,
                           selB = 0,
                           selC = 0,
                           selD = 0,
                           selE = 0,).put()

#cleared indicates whether the web page is waiting the questions
#matched indicates whether the web page is in mentor match session.
#headlines are all the selections made in this round, likes are the number of selection.
class Hashtag(ndb.Model):
    point = ndb.IntegerProperty()
    hashtag = ndb.StringProperty()


class ScoreBoard(ndb.Model):
    score = ndb.IntegerProperty()
    username = ndb.StringProperty()
    
class Game(ndb.Model):
    gameround = ndb.IntegerProperty(default=0)
    cleared = ndb.BooleanProperty(default=False)
    headlines = ndb.StringProperty(repeated=True)
    likes = ndb.JsonProperty(default={})
    facts = ndb.JsonProperty(default={})
    gogancitizenlies = ndb.IntegerProperty(default=0)
    roosacitizenlies = ndb.IntegerProperty(default=0)
    goganmedialies = ndb.IntegerProperty(default=0)
    roosamedialies = ndb.IntegerProperty(default=0)
    versioncontrol = ndb.IntegerProperty(default=0)
    matched = ndb.BooleanProperty(default=False)

    def setMatch(self):
        self.matched = True;

    def disableMatch(self):
        self.matched = False;

    def nextRound(self):
        if self.gameround < 5:
            self.gameround += 1
        else:
            self.gameround = self.gameround
        self.cleared = False
        #for k in self.likes:
        #     if self.likes[k] > 0:
        #         self.likes[k] *= -1

    def clearRound(self):
        self.cleared = True
        self.headlines = []
        self.likes = {}
        self.facts = {}
        self.versioncontrol += 1

    def getInfo(self):
        return {
            'headlines': self.headlines,
            'likes': self.likes
        }

    def reset(self):
        self.gameround = 0
        self.cleared = True
        self.headlines = []
        self.likes = {}
        self.facts = {}
        self.gogancitizenlies = 0
        self.roosacitizenlies = 0
        self.goganmedialies = 0
        self.roosamedialies = 0
        self.versioncontrol += 1

    @staticmethod
    def createGame():
        Game(gameround = 0,
            cleared = True,
            headlines = [],
            likes = {},
            facts = {},
            gogancitizenlies = 0,
            roosacitizenlies = 0,
            goganmedialies = 0,
            roosamedialies = 0,
            versioncontrol = 0,
            matched = False).put()

class User(ndb.Model):
    name = ndb.StringProperty()
    img = ndb.IntegerProperty()
    title = ndb.StringProperty()
    hashtag = ndb.StringProperty()
    source = ndb.IntegerProperty()
    point = ndb.IntegerProperty()
    # step = ndb.IntegerProperty()
    # headlines = ndb.JsonProperty()
    # gender = ndb.StringProperty()
    # age = ndb.StringProperty()
    # race = ndb.StringProperty()

    #this part is useless
    @staticmethod
    def testCreate():
        for i in range(1,41):
            User(name= 'citizen'+str(i), team=1, headlines={
                0: ['', ''],
                1: ['', ''],
                2: ['', ''],
                3: ['', ''],
                4: ['', ''],
                5: ['', ''],
                6: ['', ''],
                7: ['', ''],
                8: ['', '']}).put()

        for i in range(41,81):
            User(name= 'citizen'+str(i), team=2, headlines={
                0: ['', ''],
                1: ['', ''],
                2: ['', ''],
                3: ['', ''],
                4: ['', ''],
                5: ['', ''],
                6: ['', ''],
                7: ['', ''],
                8: ['', '']}).put()

        User(name='media1', team=1, headlines={
            0: ['',''],
            1: question1,
            2: question2,
            3: question3,
            4: question4,
            5: ['A', 'B', 'C', 'D'],
            6: ['A', 'B', 'C', 'D'],
            7: ['A', 'B', 'C', 'D'],
            8: ['A', 'B', 'C', 'D']}).put()
        User(name='media2', team=1, headlines={
            0: ['',''],
            1: question1,
            2: question2,
            3: question3,
            4: question4,
            5: ['A', 'B', 'C', 'D'],
            6: ['A', 'B'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media3', team=1, headlines={
            0: ['',''],
            1: ['Roosan Social Security Plan in Trouble', 'Roosan Officials Don\'t Respect Promise of Social Security'],
            2: ['Roosan Finance Minister Insured Mines', 'Roosan Finance Minister Anticipated Bombing'],
            3: ['Treasury Security Designed by Roosan Engineers', 'Treasury Security Only Hackable by Roosans'],
            4: ['Roosan State Minister Stayed Cool During Panic', 'Roosan State Minister Laughed After Poisoning'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media4', team=1, headlines={
            0: ['',''],
            1: ['More Roosan Elders Outliving Spouses Than Ever Before', 'Most Roosan Elders Die Alone'],
            2: ['Roosan State Minister Asks to Renegotiate Mining Negotiations', 'Insults Fly from Roosan State Minister'],
            3: ['Roosan Finance Minister\'s Company Profited After Theft', 'Roosan Finance Minister Orchestrated Robbery'],
            4: ['Injured Roosan Finance Minister Did Not Stand for Toast', 'Roosan Officials Refused to Make Toast'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media5', team=1, headlines={
            0: ['',''],
            1: ['Families More Likely to Live Apart in Roosa', 'Family Unit in Roosa Falling Apart'],
            2: ['Bombers Wore Uniform of Roosan Sports Team', 'Bombers Seen Waving Roosan Flag'],
            3: ['No Reports of Money Leaving Roosan Borders', 'Stolen Money Seen Still Within Roosan Borders'],
            4: ['Roosan Prime Minister Sat Closest to Deceased Senator', 'Murdered Senator\'s Glass Poured by Roosan Prime Minister'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media6', team=2, headlines={
            0: ['',''],
            1: ['Gogan Parents Less Likely to Leave Inheritance to Children', 'Gogan Parents Don\'t Care About Future of Children'],
            2: ['Gogan Senators Protested Energy Pollution from Mines', 'Gogans Seen Rioting at Energy Mines Before Attack'],
            3: ['Gogan General Staying Out of Investigation', 'Gogan General Refuses to Talk with Roosan Investigators'],
            4: ['All Security was Run by Gogan Military', 'Security Run by Gogans was Intentionally Weak'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media7', team=2, headlines={
            0: ['',''],
            1: ['Education in Gogan State is Mostly Privatized', 'Public Education in Gogan State Lacks Support'],
            2: ['Terrorists\' Weapons Were Gogan Made', 'Gogan Manufacters Provided Terrorist Weapons'],
            3: ['Gogan State in Debt and Needed Money', 'Money from Heist Goes Toward Fixing Gogan Debt'],
            4: ['Gogan President Vetoed Deceased Senator\'s Final Bill', 'Gogan President Hated the Murdered Senator'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media8', team=2, headlines={
            0: ['',''],
            1: ['Statistics Show Small Rise in Gogan Underage Crime', 'Gogan Children Turn to Crime'],
            2: ['Military of Gogan State on Retreat During Bombing', 'Gogan General Knew Bombing was Going to Happen'],
            3: ['Technology Security Experts Work with Gogan Senator', 'Gogan Senator is Friends with Security Hacker'],
            4: ['Deceased Senator Led Protests Against Gogan President', 'Mudered Senator Called for Gogan President\'s Impeachment'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media9', team=2, headlines={
            0: ['',''],
            1: ['Gogan Businesses Pull Funding from Questionable Charity', 'Gogan Businesses Stop Supporting Youth Charity Program'],
            2: ['Gogan President Remains Silent about Bombing', 'Gogan President Refuses to Answer Questions'],
            3: ['Gogan President at Meeting Near Treasury During Heist', 'Gogan President\'s Ship Seen Fleeing Scene of Crime'],
            4: ['Gogans Fail to Release Senator\'s Private Records', 'Gogans Deleted All Records of the Senator from Existence'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        User(name='media10', team=2, headlines={
            0: ['',''],
            1: ['Surveyed Gogan Children Report Widespread Loneliness', 'Gogan Parents Rarely Spend Time with Children'],
            2: ['Bomber Used Outdated Gogan Resistance Weapons', 'Bombers Belonged to Known Gogan Resistance Group'],
            3: ['Ship Used By Thieves Had Gogan License', 'Ship Used By Thieves Belongs to Gogans'],
            4: ['Gogan General Lead Team to Identify Poison Used', 'Gogan General is Expert on Poison Used'],
            5: ['REAL', 'FAKE'],
            6: ['REAL', 'FAKE'],
            7: ['REAL', 'FAKE'],
            8: ['REAL', 'FAKE']}).put()
        # User(name='media1', team=1, headlines={
        #     1: ['11111111111', '222222222222'],
        #     2: ['33333333333', '444444444444'],
        #     3: ['55555555555', '666666666666'],
        #     4: ['media11', 'media12'],
        #     5: ['REAL', 'FAKE'],
        #     6: ['FAKE', 'REAL'],
        #     7: ['FAKE', 'REAL'],
        #     8: ['REAL', 'FAKE']}).put()

        # User(name='media2', team=2, headlines={
        #     1: ['media21', 'media22'],
        #     2: ['media23', 'media24'],
        #     3: ['media25', 'media26'],
        #     4: ['media27', 'media28'],
        #     5: ['REAL', 'FAKE'],
        #     6: ['FAKE', 'REAL'],
        #     7: ['REAL', 'FAKE'],
        #     8: ['FAKE', 'REAL']}).put()

        # User(name='citizen1', team=1, headlines={
        #     1: ['', ''],
        #     2: ['', ''],
        #     3: ['', ''],
        #     4: ['', ''],
        #     5: ['', ''],
        #     6: ['', ''],
        #     7: ['', ''],
        #     8: ['', '']}).put()

        # User(name='citizen2', team=2, headlines={
        #     1: ['', ''],
        #     2: ['', ''],
        #     3: ['', ''],
        #     4: ['', ''],
        #     5: ['', ''],
        #     6: ['', ''],
        #     7: ['', ''],
        #     8: ['', '']}).put()

#automatically generate a username for a user and store their information
#mentor match selection is also handled by this handler: after step>=4
class LoginHandler(webapp2.RequestHandler):
    def post(self):
        # global selectedNum
        data = json.loads(self.request.body)
        step = data['step']
        username = data['username']
        user = User.query(User.name == username).get()
        if int(step) == -5:
            if user is not None:
                state = {'error': 'true'}
            else:
                state = {'error': 'false'}
                user = User(name=username, point=0, img=0, title="no_title", source=0, hashtag="no_hashtag");
                user.put()
            self.response.write(json.dumps(state))
        else:
            round_num = data['round']
            if round_num == 3:
                ScoreBoard(score=0, username=username).put()
            point = data['point']
            img = data['img']
            source = data['source']
            title = data['title']
            hashtag = data['hashtag']
            if user.point == None:
                user.point = point    
            else:
                point = int(point) + user.point
            user.point = point
            user.img = img
            user.title = title
            user.source = source
            user.hashtag = hashtag
            user.put()
    
    def get(self):
        login_template = JINJA_ENV.get_template('index0.html')
        self.response.out.write(login_template.render({
        }))

#Phase3 render a new page 
class Phase3Handler(webapp2.RequestHandler) :
    def get(self):
        login_template = JINJA_ENV.get_template('phase3.html')
        self.response.out.write(login_template.render({
        }))

class UserHandler(webapp2.RequestHandler):
    def get(self):
        username = self.request.get('user')
        user = User.query(User.name == username).get()
        game = Game.query().get()
        private_headlines = user.headlines[str(game.gameround)]
        headline_possibility = user.headlines[str(game.gameround+5)]
        headline_and_posiibility = zip(private_headlines, headline_possibility)
        user_template = JINJA_ENV.get_template('game.html')
        self.response.out.write(user_template.render({
            'username': username,
            'headline_and_posiibility': headline_and_posiibility,
            #'private_headlines': private_headlines,
            #'headline_possibility': headline_possibility,
        }))


class AdminHandler(webapp2.RequestHandler):
    def get(self):
        admin_template = JINJA_ENV.get_template('admin.html')
        self.response.out.write(admin_template.render())

class SideHandler(webapp2.RequestHandler):
    def get(self):
        username = self.request.get('user')
        user = User.query(User.name == username).get()
        side_template = JINJA_ENV.get_template('side.html')
        self.response.out.write(side_template.render({
            'username': username,
        }))


#frontend js is continuing reading the server state, that request is handled here.
class ReadStateHandler(webapp2.RequestHandler):
    def post(self):
        username = self.request.body
        #print(username)
        user = User.query(User.name == username).get()
        #print(user.name)
        teamNumber = user.team
        game = Game.query().get()
        state = {
            'cleared': game.cleared,
            'gameround': str(game.gameround),
            'private_headlines': user.headlines[str(game.gameround)],
            'public_headlines': game.headlines,
            'teamNumber': teamNumber,
            'facts' : game.facts,
            'versioncontrol' : game.versioncontrol,
            'thequestion' : question0[game.gameround - 1],
            'matched' : game.matched,
        }
        self.response.write(json.dumps(state))

#Unity is reading the selections made, all selections and how many people have already made the selections.
class UnityReadHandler(webapp2.RequestHandler):
    def get(self):
        global userNum
        global selectedNum
        game = Game.query().get()
        user = User.query(User.name == 'media0').get()
        matrix = [[0 for i in range(5)] for i in range(5)]
        for i in range(0, 5):
            student = MatchSelection.query(MatchSelection.name == 'student' + str(i + 1)).get()
            matrix[i][0] = student.selA
            matrix[i][1] = student.selB
            matrix[i][2] = student.selC
            matrix[i][3] = student.selD
            matrix[i][4] = student.selE
        state = {
            'private_headlines': user.headlines[str(game.gameround)],
            'public_headlines': game.headlines,
            'likes': game.likes,
            'userNum': userNum,
            'match': matrix,
            'selectedNum': selectedNum,
        }
        self.response.write(json.dumps(state))

class UnityReadHandler2(webapp2.RequestHandler):
    def get(self):
        users = User.query()
        tags = Hashtag.query()
        scores = ScoreBoard.query()
        hashtags = []
        hashpoints = []
        names = []
        points  =[]
        scorenames = []
        scorepoints = []
        for user in users:
            names.append(user.name)
            points.append(user.point)
        for tag in tags:
            hashtags.append(tag.hashtag)
            hashpoints.append(tag.point)
        for score in scores:
            scorenames.append(score.username)
            scorepoints.append(score.score)
        state = {
            'names': names,
            'points': points,
            'hashtags':hashtags,
            'hashpoints':hashpoints,
            'scorenames':scorenames,
            'scorepoints':scorepoints,
        }
        self.response.write(json.dumps(state))
#Change the status to false
class ResetHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        game.cleared = False
        game.put()


#Change the status to true 
class MatchStateHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        # game.setMatch()
        game.cleared = True
        game.put()
        
#Judge status and decide whether the new game goona start or not
class StatusHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        status = game.cleared
        if status == True:
            state = {'state': 'true'}
        else:
            state = {'state': 'false'}
        self.response.write(json.dumps(state))

#return the mentor match static page
class MatchMentorHandler(webapp2.RequestHandler):
    def get(self):
        match_template = JINJA_ENV.get_template('index1.html')
        self.response.out.write(match_template.render({ }))

#receive the selection and stored in the game states.
class IncrementHeadlineHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        headline_user = json.loads(self.request.body)
        headline = headline_user['headline']
        username = headline_user['username']
        user = User.query(User.name == username).get()
        user_headlines = user.headlines[str(game.gameround)]
        fact = None
        if user_headlines[0] == headline:
            fact = user.headlines[str(game.gameround+5)][0]
        if user_headlines[1] == headline:
            fact = user.headlines[str(game.gameround+5)][1]
        if headline in game.headlines:
            game.likes[headline] += 1
            if game.gameround > 1:
                if game.facts[headline] == 'FAKE':
                    if user.team == 1:
                        game.gogancitizenlies += 1
                    if user.team == 2:
                        game.roosacitizenlies += 1
        else:
            game.likes[headline] = 1
            game.headlines.append(headline)
            game.facts[headline] = fact
            if game.gameround > 1:
                if fact == 'FAKE':
                    if user.team == 1:
                        game.goganmedialies += 1
                    if user.team == 2:
                        game.roosamedialies += 1
        game.put()
        # q = taskqueue.Queue('headlines')
        # q.add(taskqueue.Task(payload=headline, method='PULL'))

#move to the next round, which means display the next question.
class IncrementRoundHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        game.nextRound()
        game.put()
        #q = taskqueue.Queue('headlines')
        #q.add(taskqueue.Task(payload='increment-round', method='PULL'))
#move to the waiting page before second scenario
class IncrementRoundtwoHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        game.nextRound()
        game.nextRound()
        game.cleared = True
        game.put()

#move to the the waiting page before third scenario
class IncrementRoundthreeHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        game.nextRound()
        game.nextRound()
        game.nextRound()
        game.nextRound()
        game.cleared = True
        game.put()

#turn the page into waiting state since that the frontend will find that the game state is cleared.
class ClearRoundHandler(webapp2.RequestHandler):
    def post(self):
        game = Game.query().get()
        game.clearRound()
        game.disableMatch()
        game.put()
        for i in range(1, 6):
            match = MatchSelection.query(MatchSelection.name == 'student' + str(i)).get()
            match.selA = 0
            match.selB = 0
            match.selC = 0
            match.selD = 0
            match.selE = 0
            match.put()
        #q = taskqueue.Queue('headlines')
        #q.add(taskqueue.Task(payload='clear-round', method='PULL'))

#the initialization creates the database table at first. Make use of this to create different tables.
class InitializeHandler(webapp2.RequestHandler):
    def post(self):
        #User.testCreate()
        Game.createGame()
        # MatchSelection.createMatch()


class HeadlinesWorker(webapp2.RequestHandler):
    def get(self):
        q = taskqueue.Queue('headlines')
        while True:
            try:
                tasks = q.lease_tasks(3600, 100)
            except:
                time.sleep(1)
                continue
            if tasks:
                def update_counts():
                    game = Game.query().get()
                    for t in tasks:
                        headline = t.payload
                        if headline == 'increment-round':
                            game.setRound(game.gameround + 1)
                        elif headline == 'clear-round':
                            game.clearRound()
                        elif headline == 'reset':
                            game.reset()
                        elif headline in game.headlines:
                            game.likes[headline] += 1
                        else:
                            game.likes[headline] = 1
                            game.headlines.append(headline)
                    game.put()
                try:
                    update_counts()
                except Exception as e:
                    logging.exception(e)
                else:
                    q.delete_tasks(tasks)
            time.sleep(1)

class UpdateSchemaHandler(webapp2.RequestHandler):
    def post(self):
        deferred.defer(update_schema_task)
        self.response.write("""
        Schema update started. Check the console for task progress.
        <a href="/">View entities</a>.
        """)

def update_schema_task(cursor=None, num_updated=0, batch_size=100):
    reload(newModel)
    query = newModel.Game.query()
    games, next_cursor, more = query.fetch_page(
        batch_size, start_cursor=cursor)

    to_put = []
    for game in games:
        # Give the new fields default values.
        # If you added new fields and were okay with the default values, you
        # would not need to do this.
        game.facts = {}
        to_put.append(game)

    # Save the updated entities.
    if to_put:
        ndb.put_multi(to_put)
        num_updated += len(to_put)
        logging.info(
            'Put {} entities to Datastore for a total of {}'.format(
                len(to_put), num_updated))

lock = threading.Lock()
class HashtagUpdateHandle(webapp2.RequestHandler):
    def post(self):
        global lock
        lock.acquire()
        data = json.loads(self.request.body)
        hashtag_heat_increase = data['hashtag_heat_increase']
        hashtag = data['hashtag']
        username = data['username']
        personal_score = ScoreBoard.query(ScoreBoard.username == username).get()
        personal_score.score = personal_score.score + int(hashtag_heat_increase)
        hashtag_filter = Hashtag.query(Hashtag.hashtag == hashtag).get()
        hashtag_filter.point = hashtag_filter.point  + int(hashtag_heat_increase)
        hashtag_filter.put()
        personal_score.put()
        lock.release()



# initialize hashtag data in database
class HashtagHandle(webapp2.RequestHandler):
    def post(self):
        global lock
        lock.acquire()
        tags = Hashtag.query()
        if tags != None:
            for tag in tags:
                tag.key.delete()
        Hashtag(point = 0,
            hashtag="#Cute").put()
        Hashtag(point = 0,
            hashtag="#LOL").put()
        Hashtag(point = 0,
            hashtag="#Scandal").put()
        Hashtag(point = 0,
            hashtag="#TheGreatest").put()
        Hashtag(point = 0,
            hashtag="#Sad").put()
        Hashtag(point = 0,
            hashtag="#DrillBabyDrill").put()
        Hashtag(point = 0,
            hashtag="#Lolcats").put()
        Hashtag(point = 0,
            hashtag="#awwwwww").put()
        Hashtag(point = 0,
            hashtag="#Jobs").put()
        Hashtag(point = 0,
            hashtag="#Winning").put()
        Hashtag(point = 0,
            hashtag="#USA").put()
        Hashtag(point = 0,
            hashtag="#ThePeopleLoveMe").put()
        Hashtag(point = 0,
            hashtag="#WinnersOnly").put()
        Hashtag(point = 0,
            hashtag="#PhonyPress").put()
        lock.release()


class HashtagDropHandle(webapp2.RequestHandler):
    def post(self):
        global lock
        lock.acquire()
        tags = Hashtag.query()
        for tag in tags:
            tag.point = int(tag.point * 0.98)
            tag.put()
        lock.release()


app = webapp2.WSGIApplication(
    [
        ('/', LoginHandler),
        ('/create_data', HashtagHandle),
        ('/update_hashtag', HashtagUpdateHandle),
        ('/update', HashtagDropHandle),
        ('/user', UserHandler),
        ('/status', StatusHandler),
        ('/admin', AdminHandler),
        ('/phase3', Phase3Handler),
        ('/read-state', ReadStateHandler),
        ('/unity-read', UnityReadHandler),
        ('/unity-read2', UnityReadHandler2),
        ('/reset', ResetHandler),
        ('/increment-headline', IncrementHeadlineHandler),
        ('/increment-round', IncrementRoundHandler),
        ('/increment-round2', IncrementRoundtwoHandler),
        ('/increment-round3', IncrementRoundthreeHandler),
        ('/clear-page', ClearRoundHandler),
        ('/initialize', InitializeHandler),
        ('/_ah/start', HeadlinesWorker),
        ('/side',SideHandler),
        ('/updatemodel', UpdateSchemaHandler),
        ('/matchstate', MatchStateHandler),
        ('/match_mentor', MatchMentorHandler),
    ], debug=True)
