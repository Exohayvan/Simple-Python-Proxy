require 'nokogiri'
require 'net/http'
require 'securerandom'

url = 'https://free-proxy-list.net/'
uri = URI(url)
headers = {
    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}

begin
    req = Net::HTTP::Get.new(uri, headers)
    response = Net::HTTP.start(uri.hostname, uri.port, :use_ssl => uri.scheme == 'https') {|http|
        http.request(req)
    }

    doc = Nokogiri::HTML(response.body)
    proxies = []

    doc.css('tbody tr').each do |row|
        tds = row.css('td')
        if tds.size >= 2
            ip = tds[0].text
            port = tds[1].text
            proxies << "#{ip}:#{port}"
        end
    end

    if proxies.empty?
        puts "No proxies found."
    else
        random_proxy = proxies[SecureRandom.random_number(proxies.size)]
        puts "Random proxy: #{random_proxy}"
    end
rescue StandardError => e
    puts "Error: #{e.message}"
end
