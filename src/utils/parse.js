// const parser = new DOMParser();

// const stringContainingXMLSource = '<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Lorem ipsum feed for an interval of 1 seconds with 10 item(s)]]></title><description><![CDATA[This is a constantly updating lorem ipsum feed]]></description><link>http://example.com/</link><generator>RSS for Node</generator><lastBuildDate>Fri, 03 Jan 2025 13:59:18 GMT</lastBuildDate><pubDate>Fri, 03 Jan 2025 13:59:18 GMT</pubDate><copyright><![CDATA[Michael Bertolacci, licensed under a Creative Commons Attribution 3.0 Unported License.]]></copyright><ttl>1</ttl><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:18Z]]></title><description><![CDATA[Dolor velit ad sit fugiat qui enim.]]></description><link>http://example.com/test/1735912758</link><guid isPermaLink="true">http://example.com/test/1735912758</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:18 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:17Z]]></title><description><![CDATA[Consequat et labore tempor laborum officia culpa velit voluptate culpa.]]></description><link>http://example.com/test/1735912757</link><guid isPermaLink="true">http://example.com/test/1735912757</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:17 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:16Z]]></title><description><![CDATA[Sunt pariatur aliqua minim adipisicing tempor labore esse eu reprehenderit laboris consectetur cillum.]]></description><link>http://example.com/test/1735912756</link><guid isPermaLink="true">http://example.com/test/1735912756</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:16 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:15Z]]></title><description><![CDATA[Ipsum ullamco reprehenderit ullamco cillum et anim amet reprehenderit magna dolore reprehenderit anim labore.]]></description><link>http://example.com/test/1735912755</link><guid isPermaLink="true">http://example.com/test/1735912755</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:15 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:14Z]]></title><description><![CDATA[Cillum nulla est officia reprehenderit aute id culpa quis aliqua occaecat culpa irure.]]></description><link>http://example.com/test/1735912754</link><guid isPermaLink="true">http://example.com/test/1735912754</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:14 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:13Z]]></title><description><![CDATA[Do magna aliquip pariatur culpa consectetur aute mollit.]]></description><link>http://example.com/test/1735912753</link><guid isPermaLink="true">http://example.com/test/1735912753</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:13 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:12Z]]></title><description><![CDATA[Adipisicing deserunt nostrud dolore labore aliqua duis sit eiusmod qui minim.]]></description><link>http://example.com/test/1735912752</link><guid isPermaLink="true">http://example.com/test/1735912752</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:12 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:11Z]]></title><description><![CDATA[Ut non aliqua id sunt commodo ut ut Lorem.]]></description><link>http://example.com/test/1735912751</link><guid isPermaLink="true">http://example.com/test/1735912751</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:11 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:10Z]]></title><description><![CDATA[Commodo esse nostrud reprehenderit pariatur eiusmod est irure excepteur mollit sunt nulla.]]></description><link>http://example.com/test/1735912750</link><guid isPermaLink="true">http://example.com/test/1735912750</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:10 GMT</pubDate></item><item><title><![CDATA[Lorem ipsum 2025-01-03T13:59:09Z]]></title><description><![CDATA[Proident sint veniam do pariatur ex Lorem qui.]]></description><link>http://example.com/test/1735912749</link><guid isPermaLink="true">http://example.com/test/1735912749</guid><dc:creator><![CDATA[John Smith]]></dc:creator><pubDate>Fri, 03 Jan 2025 13:59:09 GMT</pubDate></item></channel></rss>'

// const doc = parser.parseFromString(stringContainingXMLSource, "application/xml");

// const parseRSS = (xml) => {

// }