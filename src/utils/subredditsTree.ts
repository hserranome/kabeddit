const defaultSubreddits = [];

const subreddit = (name, isDefault?) => {
	const nameLower = name.toLowerCase();
	if (isDefault) defaultSubreddits.push(nameLower)
	return ({
		key: nameLower,
		value: nameLower,
		title: name,
	})
}

const subredditsTree = [
	{
		...subreddit('General'),
		children: [
			subreddit('CityPorn', true),
			subreddit('VillagePorn', true),
			subreddit('SpacePorn', true),
			subreddit('wallpapers', true),
			subreddit('mobilewallpaper', true),
			subreddit('nocontext_wallpapers', true),
			subreddit('Verticalwallpapers', true),
			subreddit('wallpaper', true),
		],
	},
	{
		...subreddit('Nature'),
		children: [
			subreddit('EarthPorn', true),
			subreddit('BeachPorn', true),
			subreddit('WaterPorn', true),
			subreddit('SkyPorn', true),
			subreddit('WeatherPorn', true),
			subreddit('BotanicalPorn', true),
			subreddit('LakePorn', true),
		],
	},
	{
		...subreddit('Anime'),
		children: [
			subreddit('AnimePhoneWallpapers', false),
			subreddit('awwnime', false),
			subreddit('animeponytails', false),
			subreddit('Pixiv', false),
			subreddit('LongHairedWaifus', false),
			subreddit('ShortHairedWaifus', false),
			subreddit('Kemonomimi', false),
			subreddit('ReasonableFantasy', false),
			subreddit('Fantasyanimeart', false),
			subreddit('ImaginarySliceOfLife', false),
			subreddit('Kitsunemimi', false),
			subreddit('Ecchi', false),
			subreddit('twodeeart', false),
			subreddit('Moescape', false),
			subreddit('Patchuu', false),
			subreddit('AnimeWallpaper', false),
			subreddit('megane', false),
			subreddit('streetmoe', false),
		],
	},
];


export { defaultSubreddits };
export default subredditsTree;