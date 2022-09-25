import http.server, ssl

server_address = ('0.0.0.0',443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket, server_side=True, keyfile="../certs/newsle.co.uk.key", certfile="../certs/newsle_co_uk.crt", ssl_version=ssl.PROTOCOL_TLS)

httpd.serve_forever()
