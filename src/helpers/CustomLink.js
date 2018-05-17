export const CustomLink = {
	customize: input => {
		let link = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&place_name=leeds';

		link = link.replace(/place_name=[a-z, A-Z, 0-9]+/, `place_name=${input.place}`);
		link = link.replace(/page=[0-9]+/, `page=${input.page || 1}`);

		return link;
	}
}