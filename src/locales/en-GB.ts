import type { GlobalI18n } from './@types'
import { Scope, UserPrivilege } from '~/def/user'
import { Mode, Rank, Ruleset } from '~/def'

export default {
  mode: {
    [Mode.Osu]: 'Osu',
    [Mode.Taiko]: 'Taiko',
    [Mode.Fruits]: 'CTB',
    [Mode.Mania]: 'Mania',
  },
  ruleset: {
    [Ruleset.Standard]: 'Standard',
    [Ruleset.Relax]: 'Relax',
    [Ruleset.Autopilot]: 'Autopilot',
  },
  rank: {
    [Rank.PPv2]: 'Performance(v2)',
    [Rank.PPv1]: 'Performance(v1)',
    [Rank.RankedScore]: 'Ranked Score',
    [Rank.TotalScore]: 'Total Score',
    [Rank.Score]: 'Score',
  },
  titles: {
    'leaderboard': 'Leaderboard',
    'status': 'Status',
    'settings': 'Settings',
    'relations': 'Friends & Blocks',
    'userpage': 'My Profile',
    'admin-panel': 'Admin Panel',
    'logs': 'Logs',
    'articles': 'Articles',
  },
  global: {
    'logout': 'Sign out',
    'login': 'Sign in',
    'register': 'Sign up',
    'pp': 'pp',
    'player': 'Player',
    'rank': 'Rank',
    'mods': 'Mods',
    'played-at': 'Played at',
    'acc': 'Acc',
    'accuracy': 'Accuracy',
    'play-count': 'Play Count',
    'beatmapsets': 'Beatmapsets',
    'beatmaps': 'Beatmaps',
    'users': 'Users',
    'session': 'Session',
  },
  priv: {
    [UserPrivilege.Disabled]: 'Disabled',
    [UserPrivilege.Restricted]: 'Restricted',
    [UserPrivilege.Registered]: 'Registered',
    [UserPrivilege.Inactive]: 'Inactive',
    [UserPrivilege.Normal]: 'Normal',
    [UserPrivilege.Supported]: 'Supported',
    [UserPrivilege.Supporter]: 'Supporter',
    [UserPrivilege.Whitelisted]: 'Whitelisted',
    [UserPrivilege.Alumni]: 'Alumni',
    [UserPrivilege.TournamentStuff]: 'Tournament Staff',
    [UserPrivilege.ChannelModerator]: 'Channel Moderator',
    [UserPrivilege.Moderator]: 'Moderator',
    [UserPrivilege.BeatmapNominator]: 'Beatmap Nominator',
    [UserPrivilege.Staff]: 'Staff',
    [UserPrivilege.Admin]: 'Admin',
    [UserPrivilege.Owner]: 'Owner',
    [UserPrivilege.Bot]: 'Bot',
  },
  scope: {
    [Scope.Self]: 'Self',
    [Scope.Friends]: 'Friends',
    [Scope.Public]: 'Everyone',
  },
} satisfies GlobalI18n as GlobalI18n
