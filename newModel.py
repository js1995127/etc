from google.appengine.ext import ndb


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



    def nextRound(self):
        if self.gameround < 4:
            self.gameround += 1
        else:
            self.gameround = self.gameround
        self.cleared = False

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
            versioncontrol = 0).put()